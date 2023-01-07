import { z } from "zod";

const loginAuth = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1)
})

const registerAuth = loginAuth.extend({
  name: z.string().min(1).max(32),
  password: z.string().min(6).max(32),
  confirm_password: z.string().min(1)
}).refine(v => v.password === v.confirm_password, {
  message: 'Passwords not match',
  path: ['confirm_password']
});

type LoginAuth = z.infer<typeof loginAuth>;
type RegisterAuth = z.infer<typeof registerAuth>;

export { loginAuth, registerAuth, type LoginAuth, type RegisterAuth };