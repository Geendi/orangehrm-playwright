export interface Employee {
  firstName: string;
  middleName?: string;
  lastName: string;
}

/** Unique data per test so parallel runs never collide on the shared demo. */
export function buildEmployee(overrides: Partial<Employee> = {}): Employee {
  const id = `${Date.now().toString(36)}${Math.floor(Math.random() * 1e4)}`;
  return { firstName: 'Auto', lastName: `Test${id}`, ...overrides };
}

export const invalidLogins = [
  { title: 'wrong password', username: 'Admin', password: 'wrongpass' },
  { title: 'wrong username', username: 'NoSuchUser', password: 'admin123' },
  { title: 'both wrong', username: 'foo', password: 'bar' },
] as const;
