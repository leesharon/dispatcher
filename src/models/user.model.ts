export interface User {
    displayName: string | null
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    metadata: { creationTime: number, lastSignInTime: number }
    multiFactor: { enrolledFactors: [] }
    phoneNumber: string | null
    photoURL: null
    providerData: [Object]
    providerId: string
    tenantId: string | null
    uid: string
}