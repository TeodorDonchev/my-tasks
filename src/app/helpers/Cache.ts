import { HttpClient } from "@angular/common/http";
import * as dayjs from "dayjs";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

interface ICache<T> {
    get expires(): Date;
    get value(): Observable<T[]>;
    update(value: Observable<T[]>): void;
}

///<summary>
/// Cache class for caching data from the server
///</summary>
export class ObservableCache<T> implements ICache<T>{
    
    get expires(): Date {
        return this._expires;
    }
    ///<summary>
    ///Set the default value for expired
    ///</summary>
    private _expires: Date = dayjs().subtract(environment.cacheExpation.value, environment.cacheExpation.type).toDate();
    private _value: Observable<T[]> = new Observable<T[]>();
   
    public get value(): Observable<T[]> {
        if (dayjs().isAfter(this._expires))
        throw new Error("cache expired");
    return this._value;
    }
    public set value(value: Observable<T[]>) {
        this._value = value;
    }
    constructor() {
    }
    ///<summary>  
    ///get default expation date for the cache
    ///</summary>
    ///<returns>default expation date</returns>
    static getDefaultExpation() {
        return dayjs().add(environment.cacheExpation.value, environment.cacheExpation.type).toDate();
    }
    ///<summary>
    ///update the cache with new value
    ///</summary>
    update(value: Observable<T[]>) {
        this._value = value;
        this._expires = ObservableCache.getDefaultExpation();
    }
}

export interface IService<T> {
    get(): Observable<T[]>;
    getById(id: number): Observable<T>;
    add(item: T): Observable<T>;
    update(item: T): Observable<T>;
    delete(id: number): Observable<T>;
}

export class HttpBaseService<T> implements IService<T>{
    constructor(private http: HttpClient, private host: string, private controller: string) {
    }
    get(): Observable<T[]> {
        return this.http.get<Array<T>>(this.host + this.controller);
    }
    getById(id: number): Observable<T> {
        throw new Error('Method not implemented.');
    }
    add(item: T): Observable<T> {
        throw new Error('Method not implemented.');
    }
    update(item: T): Observable<T> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Observable<T> {
        throw new Error('Method not implemented.');
    }
}
    

export class HttpServiceCacheDecorator<T> implements IService<T>{
    cache: any;
    constructor(private service: HttpBaseService<T>) {
        this.cache = new ObservableCache<T>();
    }
    get(): Observable<T[]> {
        //read from cache
        try {
            return this.cache.value;
        }
        //if cache expired
        catch (e) {
            //get data from server
            let data = this.service.get();
            //update cache
            this.cache.update(data);
            return data;
        }
    }
    getById(id: number): Observable<T> {
        throw new Error("Method not implemented.");
    }
    add(item: T): Observable<T> {
        throw new Error("Method not implemented.");
    }
    update(item: T): Observable<T> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Observable<T> {
        throw new Error("Method not implemented.");
    }

}