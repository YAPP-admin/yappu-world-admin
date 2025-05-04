import { z } from 'zod';

export const ActivityUnitSchema = z.object({
  id: z.string().nullable(),
  generation: z.preprocess(
    (val) => {
      if (typeof val === 'string' || typeof val === 'number') {
        const num = Number(val);
        return isNaN(num) ? undefined : num;
      }
      return undefined;
    },
    z
      .number({ required_error: '기수를 입력해주세요.' })
      .int('기수는 정수여야 합니다.')
      .min(1, '기수를 입력해주세요.'),
  ),

  position: z
    .string({ required_error: '직군을 선택해주세요.' })
    .min(1, '직군을 선택해주세요.'),
});

export const MemberFormSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: '이름을 입력해주세요.' })
    .min(1, '이름을 입력해주세요.'),
  email: z
    .string({ required_error: '이메일을 입력해주세요.' })
    .min(1, '이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  activityUnits: z
    .array(ActivityUnitSchema)
    .min(1, '최소 1개 이상의 활동 정보가 필요합니다.'),
  phoneNumber: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => !val || /^\d{3}-\d{4}-\d{4}$/.test(val),
      '핸드폰 번호를 형식에 맞게 입력해주세요.',
    ),
  gender: z.string().nullable().optional(),
  role: z.string().refine((val) => !!val, '권한을 선택해주세요.'),
  registrationDate: z.string(),
});

export type MemberFormType = z.infer<typeof MemberFormSchema>;
