import { Subject } from 'rxjs';

export class NotificationService {
    private notifier = new Subject<string>();
    public notifier$ = this.notifier.asObservable();

    notify(message: string) {
        this.notifier.next(message);
    }
}