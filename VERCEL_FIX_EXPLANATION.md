# 🔧 Vercel NOT_FOUND Error - Root Cause Analysis & Fix

## 📋 Summary of Issues Fixed

### 1. **Missing Dependencies in Root package.json**
**Problem**: API serverless functions in `api/` directory were importing packages (`@google/generative-ai`, `pdf-parse`, `mammoth`) that were only installed in `function/package.json`, not at the root level where Vercel expects them.

**Fix**: Added these dependencies to the root `package.json`:
```json
"dependencies": {
  "@google/generative-ai": "^0.1.3",
  "@vercel/node": "^3.0.0",
  "axios": "^1.6.0",
  "mammoth": "^1.6.0",
  "pdf-parse": "^1.1.1"
}
```

### 2. **Incorrect vercel.json Configuration**
**Problem**: Multiple configuration issues:
- **No-op rewrite rule**: `{ "source": "/api/(.*)", "destination": "/api/$1" }` doesn't actually route anywhere
- **Conflicting builds config**: Using old `builds` format that conflicts with modern Vercel
- **Missing functions config**: No runtime specification for serverless functions
- **Incorrect outputDirectory**: Should use `public` instead of `outputDirectory`

**Fix**: Updated `vercel.json` to:
- Use `public` instead of `outputDirectory`
- Remove conflicting `builds` configuration
- Add proper `functions` configuration with Node.js 18.x runtime
- Fix rewrite rules (removed the no-op `/api/(.*)` rule since Vercel auto-routes `/api/*` to serverless functions)
- Updated build command to install root dependencies first

### 3. **Missing TypeScript Type Definitions**
**Problem**: TypeScript compiler couldn't find type definitions for `pdf-parse`, causing compilation errors.

**Fix**: Added `@types/pdf-parse` to devDependencies (mammoth has built-in types).

---

## 🔍 Root Cause Analysis

### What Was Actually Happening vs. What Was Needed

**What Was Happening:**
1. Vercel tried to build your project using the `buildCommand` in `vercel.json`
2. TypeScript compilation failed because:
   - API files (`api/*.ts`) imported packages that weren't available at the root level
   - Type definitions were missing
3. Even if compilation succeeded, the `vercel.json` configuration had routing issues:
   - The rewrite rule for `/api/(.*)` was a no-op (routing to itself)
   - Missing `functions` configuration meant Vercel might not properly recognize serverless functions
4. When requests came to `/api/resumeAI`, Vercel couldn't find the function because:
   - Dependencies weren't installed at the root
   - Function configuration was incomplete
   - Result: `NOT_FOUND` error

**What Was Needed:**
1. All dependencies used by `api/` serverless functions must be in root `package.json`
2. Proper `vercel.json` configuration:
   - `functions` section to specify runtime
   - Correct `public` directory (not `outputDirectory`)
   - Proper rewrite rules (Vercel auto-routes `/api/*` to functions, so no explicit rewrite needed)
3. TypeScript type definitions for all imported packages
4. Build command that installs root dependencies before building

### What Conditions Triggered This Error?

1. **Monorepo-like structure**: You have dependencies in `function/package.json` but serverless functions in `api/` that need those same dependencies
2. **Vercel's deployment model**: Vercel serverless functions require dependencies at the project root (or in the same directory as the function)
3. **TypeScript compilation**: The CI build runs `tsc` which needs all type definitions available
4. **Configuration mismatch**: Using older Vercel config format (`builds`) mixed with newer format

### What Misconception Led to This?

**Common Misconception**: "If dependencies are installed in `function/package.json`, they'll be available to `api/` functions"

**Reality**: 
- Vercel serverless functions in `api/` are deployed independently
- They need their own dependencies at the root level
- The `function/` folder is for local development (Express server), not for Vercel deployment
- Vercel doesn't automatically merge dependencies from subdirectories

---

## 🎓 Understanding the Concept

### Why Does This Error Exist?

The `NOT_FOUND` error exists because:

1. **Serverless Function Isolation**: Each Vercel serverless function is deployed as an isolated unit. It needs explicit dependency declarations.

2. **Build-Time vs Runtime**: 
   - **Build-time**: TypeScript compilation happens during CI/CD
   - **Runtime**: Functions execute in isolated environments
   - If dependencies aren't declared correctly, the function can't be built or deployed

3. **Route Resolution**: Vercel needs to know:
   - Which files are serverless functions (`api/*.ts`)
   - What runtime to use (`nodejs18.x`)
   - How to route requests (`/api/*` → `api/*.ts`)

### Correct Mental Model

```
┌─────────────────────────────────────────┐
│         Vercel Deployment               │
├─────────────────────────────────────────┤
│                                         │
│  Root package.json                      │
│  ├─ Dependencies for api/* functions   │ ← Must be here!
│  └─ Build scripts                       │
│                                         │
│  api/                                   │
│  ├─ resumeAI.ts  → /api/resumeAI       │
│  ├─ health.ts    → /api/health         │
│  └─ (other functions)                  │
│                                         │
│  vercel.json                            │
│  ├─ functions config (runtime)          │
│  ├─ public directory                    │
│  └─ rewrites (SPA routing)              │
│                                         │
│  frontend/public/                       │
│  └─ index.html (served for all routes) │
└─────────────────────────────────────────┘
```

**Key Points:**
- `api/` folder = Serverless functions (deployed separately)
- `function/` folder = Local dev server (not deployed to Vercel)
- Root `package.json` = Dependencies for serverless functions
- `vercel.json` = Deployment configuration

### How This Fits into Vercel's Framework

1. **File-Based Routing**: Files in `api/` automatically become endpoints
   - `api/resumeAI.ts` → `POST /api/resumeAI`
   - `api/health.ts` → `GET /api/health`

2. **Dependency Resolution**: Vercel installs dependencies from:
   - Root `package.json` (for all functions)
   - Or `api/[function]/package.json` (function-specific)

3. **Build Process**:
   ```
   Install root dependencies → Build TypeScript → Deploy functions → Serve static files
   ```

---

## ⚠️ Warning Signs to Watch For

### Code Smells That Indicate This Issue

1. **TypeScript Compilation Errors in CI**:
   ```
   error TS2307: Cannot find module '@google/generative-ai'
   ```
   → Dependencies missing in root `package.json`

2. **404/NOT_FOUND on API Routes**:
   - API works locally but fails on Vercel
   - Check if dependencies are in root `package.json`

3. **"Module not found" at Runtime**:
   - Function deploys but crashes when called
   - Dependencies installed in wrong location

4. **vercel.json Configuration Issues**:
   - Using `builds` (old format) instead of `functions`
   - No-op rewrite rules like `/api/(.*)` → `/api/$1`
   - Missing `functions` runtime specification

### Similar Mistakes to Avoid

1. **Monorepo Dependency Confusion**:
   ```json
   // ❌ WRONG: Only in subdirectory
   function/package.json: { "dependencies": { "express": "..." } }
   
   // ✅ CORRECT: Also in root for api/ functions
   package.json: { "dependencies": { "express": "..." } }
   ```

2. **Incorrect vercel.json Structure**:
   ```json
   // ❌ WRONG: Old format + no-op rewrite
   {
     "builds": [...],
     "rewrites": [
       { "source": "/api/(.*)", "destination": "/api/$1" }
     ]
   }
   
   // ✅ CORRECT: Modern format
   {
     "functions": {
       "api/**/*.ts": { "runtime": "nodejs18.x" }
     },
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

3. **Missing Type Definitions**:
   ```json
   // ❌ WRONG: No types for pdf-parse
   "dependencies": { "pdf-parse": "^1.1.1" }
   
   // ✅ CORRECT: Add types
   "devDependencies": { "@types/pdf-parse": "^1.1.4" }
   ```

### Patterns That Indicate This Issue

- ✅ **Good Pattern**: Dependencies used by `api/` functions are in root `package.json`
- ❌ **Bad Pattern**: Dependencies only in `function/package.json` but imported by `api/*.ts`

- ✅ **Good Pattern**: `vercel.json` uses `functions` config with runtime
- ❌ **Bad Pattern**: `vercel.json` uses old `builds` format or missing `functions`

- ✅ **Good Pattern**: Build command installs root deps: `npm install && cd function && npm install && npm run build`
- ❌ **Bad Pattern**: Build command only installs function deps: `cd function && npm install && npm run build`

---

## 🔄 Alternative Approaches & Trade-offs

### Approach 1: Root-Level Dependencies (✅ Current Fix)
**Pros:**
- Simple and straightforward
- Works well for small to medium projects
- All functions share same dependencies (smaller bundle size)

**Cons:**
- All functions get all dependencies (even if unused)
- Can lead to larger function bundles

**Best For**: Projects where multiple functions share dependencies

### Approach 2: Function-Specific Dependencies
**Structure:**
```
api/
├── resumeAI/
│   ├── package.json  (with @google/generative-ai)
│   └── index.ts
└── health/
    ├── package.json  (minimal deps)
    └── index.ts
```

**Pros:**
- Each function only includes what it needs
- Smaller individual function bundles
- Better for large projects with many functions

**Cons:**
- More complex structure
- Duplicate dependencies if functions share packages
- More maintenance overhead

**Best For**: Large projects with many functions that don't share dependencies

### Approach 3: Monorepo with Workspaces
**Structure:**
```
package.json (workspace root)
├── packages/
│   ├── api-functions/ (shared dependencies)
│   └── frontend/
```

**Pros:**
- Better dependency management
- Shared code between functions
- Scales well for large projects

**Cons:**
- More complex setup
- Requires workspace configuration
- Overkill for small projects

**Best For**: Large monorepo projects with multiple packages

### Recommendation

For your current project, **Approach 1 (root-level dependencies)** is the best choice because:
- You have a small number of API functions
- Functions share most dependencies
- Simpler to maintain
- Matches Vercel's default expectations

---

## ✅ Verification Steps

After deploying, verify everything works:

1. **Check Build Logs**:
   ```bash
   # Should see successful TypeScript compilation
   # No TS2307 errors
   ```

2. **Test API Endpoints**:
   ```bash
   curl https://your-domain.vercel.app/api/health
   # Should return: {"status":"ok",...}
   
   curl -X POST https://your-domain.vercel.app/api/resumeAI \
     -H "Content-Type: application/json" \
     -d '{"jobRole":"Developer","company":"Tech Corp"}'
   # Should return analysis results
   ```

3. **Check Function Logs**:
   ```bash
   vercel logs
   # Should see successful function invocations
   ```

4. **Verify Dependencies**:
   ```bash
   # In Vercel dashboard → Functions → View Source
   # Should see all dependencies available
   ```

---

## 📚 Additional Resources

- [Vercel Serverless Functions Docs](https://vercel.com/docs/functions)
- [Vercel Configuration Reference](https://vercel.com/docs/project-configuration)
- [TypeScript in Vercel Functions](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js#typescript)

---

## 🎯 Key Takeaways

1. **Dependencies for `api/` functions must be in root `package.json`**
2. **Use `functions` config in `vercel.json`, not `builds`**
3. **Vercel auto-routes `/api/*` to `api/*.ts` - no explicit rewrite needed**
4. **Install root dependencies before building**
5. **Add TypeScript type definitions for all imported packages**
