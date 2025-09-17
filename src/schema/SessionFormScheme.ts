import dayjs from 'dayjs';
import { z } from 'zod';

const NoticeSchema = z.object({
  noticeId: z.string().min(1, 'noticeId가 필요합니다.'),
  title: z.string().min(1, '공지 제목이 필요합니다.'),
});

export const SessionFormSchema = z
  .object({
    name: z
      .string({ required_error: '제목을 입력해주세요.' })
      .min(1, '제목을 입력해주세요.'),
    place: z.string(),
    date: z.date({ required_error: '시작일을 선택해주세요.' }),
    endDate: z.date({ required_error: '종료일을 선택해주세요.' }),
    time: z
      .string({ required_error: '시작 시간을 선택해주세요.' })
      .regex(/^\d{2}:\d{2}:\d{2}$/, '시작 시간을 선택해주세요.'),
    endTime: z
      .string({ required_error: '종료 시간을 선택해주세요.' })
      .regex(/^\d{2}:\d{2}:\d{2}$/, '종료 시간을 선택해주세요.'),

    generation: z.string({ required_error: '기수를 선택해주세요.' }),
    sessionType: z.enum(['ONLINE', 'OFFLINE', 'TEAM'], {
      required_error: '세션 타입을 선택해주세요.',
    }),
    target: z.string().default('ALL'),
    sessionAttendeeIds: z.string().array(),
    notices: z.array(NoticeSchema).default([]),
  })
  .refine(
    (data) => {
      const start = new Date(
        `${dayjs(data.date).format('YYYY-MM-DD')}T${data.time}`,
      );
      const end = new Date(
        `${dayjs(data.endDate).format('YYYY-MM-DD')}T${data.endTime}`,
      );
      return end.getTime() >= start.getTime();
    },
    {
      message: '종료일은 시작일보다 이후여야 합니다.',
      path: ['endTime'],
    },
  );

export type SessionFormType = z.infer<typeof SessionFormSchema>;
