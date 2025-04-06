export class CreateReminderDto {
    user: number;
    message: string;
    notifyAt: Date;
    remindBefore: number;
    notified: boolean;
    readyToNotify: boolean;
    afterMinutes: number;
}
