class LocalDatabase {
    public static tableExists(tableName: string): boolean {
        return localStorage.getItem(tableName) !== null;
    }

    public static createTable(tableName: string): any[] {
        localStorage.setItem(tableName, JSON.stringify([]));

        return [];
    }

    public static dropTable(tableName: string): boolean {
        localStorage.removeItem(tableName);

        return true;
    }

    public static clearTable(tableName: string): boolean {
        localStorage.setItem(tableName, JSON.stringify([]));

        return true;
    }

    public static dropAllTables(): boolean {
        localStorage.clear();

        return true;
    }

    public static findAllInTable(tableName: string): any[] | void {
        if(!this.tableExists(tableName)) {
            return;
        }

        return JSON.parse(localStorage.getItem(tableName)!);
    }

    public static findOneInTable(tableName: string, id: number): any {
        if(!this.tableExists(tableName)) {
            return;
        }

        const values = JSON.parse(localStorage.getItem(tableName)!);

        return values.find((value: any) => value.id === id);
    }

    public static updateInTable(tableName: string, id: number, data: any): any {
        if(!this.tableExists(tableName)) {
            return;
        }

        const values = JSON.parse(localStorage.getItem(tableName)!);

        const foundSpecific = values.find((value: any) => value.id === id);

        values.splice(values.findIndex((value: any) => value.id === id), 1);

        values.push({
            ...foundSpecific,
            ...data
        });

        localStorage.setItem(tableName, JSON.stringify(values));

        return values.find((value: any) => value.id === id);
    }

    public static insertInTable(tableName: string, data: any | any[]): any {
        if(!this.tableExists(tableName)) {
            return;
        }

        const values = JSON.parse(localStorage.getItem(tableName)!);

        Array.isArray(data) ? values.push(...data) : values.push(data);

        localStorage.setItem(tableName, JSON.stringify(values));

        return data;
    }

    public static removeFromTable(tableName: string, id: number): boolean | void {
        if(!this.tableExists(tableName)) {
            return;
        }

        const values = JSON.parse(localStorage.getItem(tableName)!);

        values.splice(values.findIndex((value: any) => value.id === id), 1);

        localStorage.setItem(tableName, JSON.stringify(values));

        return true;
    }
}

export default LocalDatabase;
