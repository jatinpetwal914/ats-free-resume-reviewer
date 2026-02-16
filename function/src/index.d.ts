/**
 * Resume AI handler - used by local server.js (Express).
 * Production uses Vercel serverless: api/resumeAI.ts
 */
import { Request, Response } from "express";
export declare const resumeAI: (req: Request, res: Response) => Promise<void>;
export declare const health: (_req: Request, res: Response) => void;
//# sourceMappingURL=index.d.ts.map