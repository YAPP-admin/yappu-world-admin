import { SelectedUsersMap } from '@pages/admin/sessions/SessionWrite';
import { SessionAttendees } from 'apis/session/types';

export const convertSessionAttendee = (
  attendees: SessionAttendees[] | undefined,
): SelectedUsersMap => {
  const empty: SelectedUsersMap = {
    PM: [],
    DESIGN: [],
    WEB: [],
    ANDROID: [],
    IOS: [],
    FLUTTER: [],
    SERVER: [],
  };

  if (!attendees) return empty;

  const filled = attendees.reduce(
    (acc, cur) => {
      acc[cur.position] = cur.attendees;
      return acc;
    },
    { ...empty },
  );

  return filled;
};
