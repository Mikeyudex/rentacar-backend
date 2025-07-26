export interface PayloadToken {
    role: string,
    sub: string,
    exp?: number,
    companyId?: string
}