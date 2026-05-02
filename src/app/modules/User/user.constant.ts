export const UserStatus = {
    ACTIVE: "ACTIVE",
    BLOCKED: "BLOCKED",
    PENDING: "PENDING",
    REJECTED: "REJECTED"
} as const

export const USER_ROLE = {
    admin: 'admin',
    user: 'user',
    driver: 'driver'
} as const;