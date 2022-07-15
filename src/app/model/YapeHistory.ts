export default interface YapeHistory {
    receiver: string;
    amount: number;
    action: string;
    comment: string;
    date: string;
    img?:string;
    alias?: string;
}