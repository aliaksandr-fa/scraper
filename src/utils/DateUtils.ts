class DateUtils {

    // @ todo: handle templates
    public static format(date: Date, template?: string): string {
        let day = (date.getDate()).toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
}

export default DateUtils;