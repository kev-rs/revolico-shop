interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

const user: User = {
  id: 1,
  email: "kev@gmail.com",
  name: "kev",
  password: "kev123"
}

type QuerySelect<T> = {
  [K in keyof T]?: boolean;
}

type Truely<T> = {
  [K in keyof T as T[K] extends true ? K : never]: boolean;
};

type Selected<T, S> = T extends keyof S ? T : never;

type QueryResponse<T, S> = {
  [K in keyof T as Selected<K, Truely<S>>]: T[K];
}

class Prisma<T> {
  public user: T
  constructor(user: T) {
    this.user = user
  }

  public select<S extends QuerySelect<T>>(selection: S): QueryResponse<T, S> {
    const newUser = {} as QueryResponse<T, S>;
    
    Object.keys(selection).map((key: unknown) => {
      if(selection[key as keyof S]) {
        Object.assign(newUser, {
          [key as keyof QueryResponse<T, S>]: this.user[key as keyof T]
        });
      }
    })

    return newUser as QueryResponse<T, S>;
  }
}

const prisma = new Prisma<User>(user);

const res = prisma.select({
  id: false,
  email: false,
  name: true
});

console.log(res)

interface Person {
  name: string
  lastName: string;
  age: number;
  // getName(): string;
  // getLastName(): string;
}

type OnlyProps<T> = {
  [K in keyof T]: T[K];
}

type PersonWithoutMethods = OnlyProps<Person>;

type Fn = () => string;

async function fn(): Promise<{ person: Person, isValid: boolean }> {
  const person: Person = {
    age: 12, lastName: 'bs', name: 'kev'
  }

  const isValid = true;

  return {
    person, 
    isValid
  }
}

type InferAsyncReturnType = Extract<Awaited<ReturnType<typeof fn>>, { person: any }>['person']

function fn2(props: InferAsyncReturnType) {
  
  return props
}

type RetType<T extends (...args: any[]) => any> = 
  T extends (...args: any[]) => infer R ? R : any;

type Ret = RetType<typeof fn>;

console.log(fn2({ name: 'kev', lastName: 'bs', age: 12 }))

const roles = ["user", "admin"] as const

type Roles = typeof roles[number]

type UserR = {
  role: Roles
}

// const user: UserR = {
//   role: ''
// }

export {};