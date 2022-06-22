
export default interface TimeServiceI {

    /**
     * Add a new timeout for a service
     * @param msId 
     * @param minutes 
     */
    addTimeout(msId: string, minutes: number): Promise<void>;

}