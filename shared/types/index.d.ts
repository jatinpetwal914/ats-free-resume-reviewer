/**
 * TypeScript Type Definitions for Resume AI Helper
 */
export interface ParsedResume {
    text: string;
    sections: ResumeSection[];
    skills: string[];
    experience: Experience[];
    education: Education[];
    fileName: string;
    fileType: "pdf" | "docx";
}
export interface ResumeSection {
    title: string;
    content: string;
    bullets?: string[];
}
export interface Experience {
    company: string;
    position: string;
    duration: string;
    description: string[];
    achievements?: string[];
}
export interface Education {
    institution: string;
    degree: string;
    field: string;
    year: string;
    gpa?: string;
}
export interface ATSAnalysisResult {
    atsScore: number;
    issues: ATSIssue[];
    missingKeywords: string[];
    matchedKeywords: string[];
    formatting: {
        length: {
            pages: number;
            words: number;
            optimal: boolean;
            feedback: string;
        };
        structure: {
            hasHeader: boolean;
            hasSections: boolean;
            bulletPoints: number;
            feedback: string;
        };
        readability: {
            complexWords: number;
            avgWordLength: number;
            optimal: boolean;
            feedback: string;
        };
    };
    recommendation: string;
    confidentLevel: "high" | "medium" | "low";
}
export interface ATSIssue {
    type: "error" | "warning" | "suggestion";
    message: string;
    severity: 1 | 2 | 3 | 4 | 5;
    sectionAffected?: string;
    fixSuggestion?: string;
}
export interface AIImprovementResult {
    improvedBullets: {
        original?: string;
        improved: string;
        reasoning: string;
        impactScore: number;
    }[];
    formatTips: string[];
    keywordSuggestions: string[];
    toneAnalysis: {
        current: "passive" | "active" | "mixed";
        suggestion: string;
    };
    estimatedImprovementScore: number;
}
export interface GeneratedResume {
    format: "IIT" | "OVERLEAF";
    content: string;
    metadata: {
        generatedAt: string;
        version: "1.0";
        atsCompatible: boolean;
        estimatedScore: number;
    };
}
export interface JobDescription {
    title: string;
    company: string;
    description: string;
    requirements: {
        required: string[];
        preferred: string[];
        nice_to_have?: string[];
    };
    extractedKeywords: string[];
    skillsRequired: string[];
    experienceYears: number;
    seniority: "junior" | "mid" | "senior" | "lead";
}
export interface ResumeAnalysisRequest {
    resumeFile?: {
        content: Buffer;
        fileName: string;
        fileType: "pdf" | "docx";
    };
    resumeText?: string;
    jobDescription?: string;
    jobRole: string;
    company: string;
    targetFormat: "IIT" | "OVERLEAF";
}
export interface ResumeAnalysisResponse {
    success: boolean;
    data?: {
        parsedResume: ParsedResume;
        atsAnalysis: ATSAnalysisResult;
        aiImprovements: AIImprovementResult;
        generatedResume: GeneratedResume;
        summary: {
            currentScore: number;
            potentialScore: number;
            topIssues: string[];
            quickWins: string[];
        };
    };
    error?: {
        code: string;
        message: string;
        details?: string;
    };
    metadata: {
        processingTimeMs: number;
        timestamp: string;
    };
}
export interface CompanyProfile {
    name: string;
    industry: string;
    culture: string[];
    keywords: string[];
    atsPreferences: {
        preferredFormat: "plain" | "ats-optimized";
        favoredKeywords: string[];
        valuesEmphasized: string[];
    };
}
export interface RoleProfile {
    title: string;
    level: "junior" | "mid" | "senior";
    requiredSkills: string[];
    preferredSkills: string[];
    experienceYears: number;
    keywords: string[];
    atsKeywords: string[];
}
export interface ATSConfig {
    maxLength: number;
    minLength: number;
    optimalPages: number;
    forbiddenElements: string[];
    scoringWeights: {
        structure: number;
        keywords: number;
        formatting: number;
        readability: number;
    };
}
//# sourceMappingURL=index.d.ts.map