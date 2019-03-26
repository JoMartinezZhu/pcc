interface IRequest<T> {
    (args: T): Promise<object>;
}
interface IStartRoutes {
    page: string;
    childRoutes?: IStartRoutes[];
}
declare const G: {
    api: {
        signIn: IRequest<{ userId: number }>;
        getWechatInitData: IRequest<{ url: string }>;
        getUploadToken: IRequest<{ query: { persistenceType: string; filename: string } }>;
    };
    history: History;
    isMobile: boolean;
    isWechat: boolean;
    token: string;
    start(args: { api?: object; routes?: IStartRoutes[]; hashHistory?: boolean }): void;
    setupUser(args: {
        token: string;
        loginName: string;
        displayName: string;
        expiresIn?: number;
    }): void;
    storage: {
        sync?: (products: string[], fn: any) => void;
        set: (key: string, val: string, seconds?: number) => void;
        get: (key: string, defaultValue: string) => string;
        del: (key: string) => void;
        has: (key: string) => boolean;
    };
    gotoSignIn(): void;
    wechatShare: (
        args: {
            title: string;
            desc: string;
            link: string;
            imgUrl: string;
        }
    ) => void | null;
};
