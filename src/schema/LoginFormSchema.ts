import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: '이메일을 입력해주세요.' })
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string({ required_error: '비밀번호를 입력해주세요.' })
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(20, '비밀번호는 20자 이하여야 합니다.'),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
