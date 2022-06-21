
export default interface TimeServiceI {

    addTimeout(msId: string, minutes: number): Promise<void>;

}