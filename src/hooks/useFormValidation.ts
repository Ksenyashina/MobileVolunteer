import { useState } from 'react';

interface FormErrors {
  [key: string]: string;
}

interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

export const useFormValidation = (initialValues: any, validationRules: ValidationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Валидация email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Валидация телефона (российский формат)
  const phonePattern = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  // Валидация пароля (минимум 6 символов, хотя бы одна цифра и одна буква)
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const validateField = (name: string, value: string): string => {
    const rule = validationRules[name];
    if (!rule) return '';

    if (rule.required && (!value || value.trim() === '')) {
      return 'Поле обязательно для заполнения';
    }

    if (value && rule.pattern) {
      if (!rule.pattern.test(value)) {
        if (name === 'email') return 'Введите корректный email';
        if (name === 'phone') return 'Введите корректный номер телефона';
        if (name === 'password') return 'Пароль должен содержать минимум 6 символов, хотя бы одну букву и одну цифру';
        return 'Некорректный формат';
      }
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      return `Минимальная длина ${rule.minLength} символов`;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      return `Максимальная длина ${rule.maxLength} символов`;
    }

    if (rule.custom) {
      return rule.custom(value) || '';
    }

    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key, values[key] || '');
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });

    // Валидация при изменении, если поле было затронуто
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, values[name] || '');
    setErrors({ ...errors, [name]: error });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
  };
};

// Константы с правилами валидации для разных форм
export const validationRules = {
  login: {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 6,
    },
  },
  register: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    },
  },
  profile: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      pattern: /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
    },
    city: {
      required: true,
      minLength: 2,
    },
  },
};