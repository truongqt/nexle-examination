import { colors } from "assets";

export type PasswordStrength = 'Short' | 'Weak' | 'Fair' | 'Good' | 'Strong' | '';

export interface PasswordStrengths {
    strength: PasswordStrength;
    color: string;
    barWidth: string;
}

export const checkPasswordStrength = (password: string): PasswordStrengths => {
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})');
    const goodPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');
    const fairPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.{6,})');
    const weakPassword = new RegExp('(?=.{6,})');

    if (strongPassword.test(password)) {
        return {
            strength: "Strong",
            color: colors.error.strong,
            barWidth: '100%'
        }
    } else if (goodPassword.test(password)) {
        return {
            strength: "Good",
            color: colors.error.good,
            barWidth: '75%'
        }
    } else if (fairPassword.test(password)) {
        return {
            strength: "Fair",
            color: colors.error.fair,
            barWidth: '50%'
        }
    }
    else if (weakPassword.test(password)) {
        return {
            strength: "Weak",
            color: colors.error.week,
            barWidth: '25%'
        }
    }
    else if(password === ''){
        return {
            strength: '',
            color: colors.error.good,
            barWidth: '100%'
        }
    }
    else {
        return {
            strength: "Short",
            color: colors.error.short,
            barWidth: '0%'
        }
    }
}

export type ValidateEmail = 'Invalid email' | ''
export const checkValidEmail = (email: string): ValidateEmail => {
    const emailRegex =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (emailRegex.test(email)) {
        return ''
    }
    else {
        return 'Invalid email'
    }
};