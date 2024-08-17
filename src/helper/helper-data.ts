export class HelperData {
    formatDueDate(dateString: string): string {
        const utcDate: Date = new Date(dateString);
        const offset: number = -3;

        const brDate: Date = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);

        const formattedDate = [
            String(brDate.getDate()).padStart(2, '0'),
            String(brDate.getMonth() + 1).padStart(2, '0'),
            brDate.getFullYear(),
        ].join('/');

        return formattedDate;
    }
}