export const getIconForRole = (role) => {
    switch (role) {
        case 'teacher':
            return 'school';
        case 'parent':
            return 'person_pin';
        case 'medical professional':
            return 'local_hospital';
        default:
            return 'person'; //  default 
    }
};

export const getIconForPost = (postId) => {
    const postIcons = ['article', 'comment', 'speaker_notes', 'lightbulb', 'assessment'];
    if (!postId || postId.length === 0) return postIcons[0]; // Default icon if no ID
    const lastChar = postId.slice(-1);
    const index = parseInt(lastChar, 16) % postIcons.length; 

    return postIcons[index];
};

export const getIconForSpecialty = (specialty) => {
    const lowerCaseSpecialty = specialty.toLowerCase();

    if (lowerCaseSpecialty.includes('therapist')) {
        return 'psychology'; 
    }
    if (lowerCaseSpecialty.includes('logoped')) {
        return 'record_voice_over'; 
    }
    
    return 'star';
};

export const getIconForPostType = (type) => {
    switch (type) {
        case 'article': return 'article';
        case 'guide': return 'map';
        case 'research paper': return 'science';
        default: return 'description';
    }
};