declare namespace FE {
    /**
     * package.json 信息
     *
     * @interface pkgInfo
     */
    export interface a{
        name: string;
    }

}

interface pkgInfo {
    name: string;
    version: string;
    config?: object;
}
