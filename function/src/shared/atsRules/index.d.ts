/**
 * ATS Rules and Scoring Configuration
 */
export declare const ATS_RULES: {
    length: {
        minWords: number;
        maxWords: number;
        optimalPages: number;
        maxPages: number;
        scoring: {
            tooShort: number;
            tooLong: number;
            optimal: number;
        };
    };
    structure: {
        requiredSections: string[];
        optionalSections: string[];
        scoring: {
            missingRequired: number;
            goodStructure: number;
            excellentStructure: number;
        };
    };
    formatting: {
        forbiddenElements: string[];
        allowedSymbols: string[];
        recommendedFont: string[];
        fontSizeRange: number[];
        scoring: {
            forbiddenElement: number;
            allowedElement: number;
            properFormatting: number;
        };
    };
    keywords: {
        minKeywordMatches: number;
        scoring: {
            perKeywordMatch: number;
            bonusFor5Plus: number;
            bonusFor10Plus: number;
            noMatches: number;
        };
    };
    bulletPoints: {
        minBulletsPerRole: number;
        scoring: {
            strongActionVerb: number;
            quantifiedAchievement: number;
            specificity: number;
            passiveVoice: number;
            generic: number;
        };
        actionVerbExamples: string[];
        weakWords: string[];
    };
    experience: {
        scoring: {
            relevantRole: number;
            relevantCompany: number;
            yearsMismatched: number;
            noExperienceSection: number;
        };
    };
    skills: {
        minSkills: number;
        scoring: {
            relevantSkill: number;
            certifications: number;
            technology: number;
            softSkill: number;
            overflowingSkills: number;
        };
    };
    education: {
        scoring: {
            relatedDegree: number;
            prestigiousInstitution: number;
            gpa: number;
            honors: number;
            noEducation: number;
        };
    };
    readability: {
        maxWordsPerBullet: number;
        maxWordsPerSentence: number;
        scoring: {
            excellentReadability: number;
            goodReadability: number;
            poorReadability: number;
        };
    };
    contactInfo: {
        required: string[];
        optional: string[];
        scoring: {
            completeInfo: number;
            incompleteInfo: number;
            noContactInfo: number;
        };
    };
};
export declare const SCORING_WEIGHTS: {
    structure: number;
    keywords: number;
    formatting: number;
    content: number;
    readability: number;
    experience: number;
};
export declare const BASE_SCORE = 100;
export declare const RED_FLAGS: {
    "no-email": string;
    "no-phone": string;
    "no-experience": string;
    "no-education": string;
    "images-detected": string;
    "tables-detected": string;
    "special-chars": string;
    "too-long": string;
    "too-short": string;
    "no-metrics": string;
    "weak-keywords": string;
    "no-skills": string;
    "multiple-columns": string;
    "pdf-scan": string;
};
export declare const GREEN_FLAGS: {
    "strong-keywords": string;
    "quantified-bullets": string;
    "action-verbs": string;
    "clear-structure": string;
    "relevant-experience": string;
    "recent-date": string;
    "consistent-format": string;
    "ats-safe": string;
};
export declare const QUICK_FIXES: {
    issue: string;
    fix: string;
    impact: string;
}[];
export declare const KEYWORD_CATEGORIES: {
    technical: {
        label: string;
        examples: string[];
    };
    soft: {
        label: string;
        examples: string[];
    };
    industry: {
        label: string;
        examples: string[];
    };
    metrics: {
        label: string;
        examples: string[];
    };
    responsibility: {
        label: string;
        examples: string[];
    };
};
export declare function calculateATSScore(analysis: any): number;
export declare function issueSeverity(issueType: string): number;
//# sourceMappingURL=index.d.ts.map