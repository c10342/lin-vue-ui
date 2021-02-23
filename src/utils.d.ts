interface Window {
    sidebar: {
        addPanel:(title:string, url:string, other:string)=>void
    }
    netscape?: {
        security: {
            PrivilegeManager: {
                enablePrivilege:(key:string)=>void
            }
        }
    }
}

interface External{
    addFavorite:(url:string, title:string)=>void
}

interface File{
    mozSlice:(start:number, end:number)=>Blob
    webkitSlice:(start:number, end:number)=>Blob
}

interface CSSStyleDeclaration{
    behavior:string
}

interface HTMLAnchorElement{
    setHomePage:(url:string)=>void
}
