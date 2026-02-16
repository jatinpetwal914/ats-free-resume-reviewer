/**
 * LLM Prompts for Resume AI Helper
 */
export declare const LLM_PROMPTS: {
    IMPROVE_RESUME: string;
    ANALYZE_JOB_DESCRIPTION: string;
    ANALYZE_ATS_COMPATIBILITY: string;
    GENERATE_RESUME_SECTIONS: string;
    IDENTIFY_SKILL_GAPS: string;
    COMPANY_ANALYSIS: string;
};
export declare const SYSTEM_PROMPT_IMPROVE = "You are an expert resume optimization AI trained to improve resumes for ATS compatibility and recruiter impact. \n\nYour expertise includes:\n- ATS (Applicant Tracking System) parsing and optimization\n- Resume formatting best practices\n- Action verb usage and impact quantification\n- Keyword matching and job description alignment\n- Professional communication and achievement highlighting\n\nAlways provide constructive, specific, and actionable feedback. Format responses as structured JSON when requested.";
export declare const SYSTEM_PROMPT_ATS = "You are an ATS specialist and resume database expert. You understand exactly how ATS systems parse and score resumes.\n\nYour expertise includes:\n- ATS parsing mechanics and limitations\n- Keyword extraction and matching\n- Formatting element detection (tables, images, special chars)\n- Section recognition and structure validation\n- Scoring algorithms used by common ATS platforms\n\nProvide detailed, specific issues with clear solutions and scoring rationale.";
export declare const ROLE_KEYWORDS: {
    "Data Analyst": string[];
    "Software Engineer": string[];
    "Product Manager": string[];
    "Project Manager": string[];
};
export declare const ACTION_VERBS: string[];
export declare const ATS_FORMATTING_RULES: {
    forbiddenSymbols: string[];
    forbiddenFormatting: string[];
    recommendedSections: string[];
    maxPages: number;
    minPages: number;
    recommendedPageCount: number;
};
//# sourceMappingURL=index.d.ts.map