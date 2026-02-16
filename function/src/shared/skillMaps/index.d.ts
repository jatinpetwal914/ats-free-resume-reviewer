/**
 * Skill Maps and Role/Company Configurations
 */
export declare const SKILL_MAPS: {
    "Data Analyst": {
        level: string;
        requiredSkills: string[];
        preferredSkills: string[];
        niceToHaveSkills: string[];
        years: number;
        keywords: string[];
        atsKeywords: string[];
    };
    "Software Engineer": {
        level: string;
        requiredSkills: string[];
        preferredSkills: string[];
        niceToHaveSkills: string[];
        years: number;
        keywords: string[];
        atsKeywords: string[];
    };
    "Product Manager": {
        level: string;
        requiredSkills: string[];
        preferredSkills: string[];
        niceToHaveSkills: string[];
        years: number;
        keywords: string[];
        atsKeywords: string[];
    };
    "Project Manager": {
        level: string;
        requiredSkills: string[];
        preferredSkills: string[];
        niceToHaveSkills: string[];
        years: number;
        keywords: string[];
        atsKeywords: string[];
    };
};
export declare const COMPANY_PROFILES: {
    Google: {
        industry: string;
        culture: string[];
        keywords: string[];
        atsPreferences: {
            preferredFormat: string;
            favoredKeywords: string[];
            valuesEmphasized: string[];
        };
    };
    Amazon: {
        industry: string;
        culture: string[];
        keywords: string[];
        atsPreferences: {
            preferredFormat: string;
            favoredKeywords: string[];
            valuesEmphasized: string[];
        };
    };
    Microsoft: {
        industry: string;
        culture: string[];
        keywords: string[];
        atsPreferences: {
            preferredFormat: string;
            favoredKeywords: string[];
            valuesEmphasized: string[];
        };
    };
    IIT: {
        industry: string;
        culture: string[];
        keywords: string[];
        atsPreferences: {
            preferredFormat: string;
            favoredKeywords: string[];
            valuesEmphasized: string[];
        };
    };
    Meta: {
        industry: string;
        culture: string[];
        keywords: string[];
        atsPreferences: {
            preferredFormat: string;
            favoredKeywords: string[];
            valuesEmphasized: string[];
        };
    };
    Tesla: {
        industry: string;
        culture: string[];
        keywords: string[];
        atsPreferences: {
            preferredFormat: string;
            favoredKeywords: string[];
            valuesEmphasized: string[];
        };
    };
};
export declare const SKILL_BRIDGE_SUGGESTIONS: {
    "missing-sql": string;
    "missing-python": string;
    "missing-tableau": string;
    "missing-excel": string;
    "missing-cloud": string;
    "missing-agile": string;
    "missing-leadership": string;
};
export declare const QUANTIFICATION_PHRASES: string[];
export declare const SECTION_KEYWORDS: {
    experience: string[];
    education: string[];
    skills: string[];
    projects: string[];
};
export declare function getSkillMap(role: string): any;
export declare function getCompanyProfile(company: string): any;
export declare function getRoleKeywords(role: string): string[];
export declare function getRoleATSKeywords(role: string): string[];
//# sourceMappingURL=index.d.ts.map