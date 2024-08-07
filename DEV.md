## Study Notes

### 03-basic design
- npx next, shadui-cn
- lib/utils.ts: export `cn` used to solve and combine classnames by twMerge and clsx.
```typescript
const className = cn('bg-blue-500', 'text-white', { 'hover:bg-blue-700': true, 'p-4': false })
// p-4 will not be applied
```
- MaxWidthWrapper


### 04-framer-motion
- install framer-motion, configure `tailwind.config.ts`

### 08-react-dropzone
- https://react-dropzone.js.org/#src
- Need to set the layout in order to make it full view screen height.
- shadcn progress by `npx shadcn-ui@latest add progress`

### 08-uploadthings
- `npm install uploadthing @uploadthing/react`
- add 'secret' + 'app_id' to `.env` 
- follow the doc page (add 2 files in app/api/uploadthing)
- add 1 another configuration file in `lib/` folder.
- install `zod` to verify the uploaded file meet our standard(format, size)
- changed core.ts and upload/page a lot, main idea is to pass the configId from the server side to the client side.
- install shadcn-toast, follow the doc: need to add <Toast/> at the app/layout.tsx.

### 08-Steps

- open /upload/layout, put it above `{children}`.
- use `usePathname()` to get the current path name.
- doing lots of checks

### 08-init database
- register neon-tech
- `npx install prisma @prisma/client`
- `npx prisma init` --> to gen prisma folder
- add `db/index.ts`, to make sure only 1 prisma client is created during dev phase by checking `process.env.NODE_ENV`. (not that important)
- add configure/design/page.tsx (the second step)

### 09-configuration
- init `schema.prisma`
  - `cuid()` the unique id but faster than `uuid()`, `@id` means the main key.
  - `  configuration   Configuration @relation(fields: [configurationId], references: [id])` fields is the outer key in current model, it related to model Configuration with its id.
  - `npm prisma db push` - this will push our schema onto Neon-tables
  - `npm i sharp@0.32.6` - used to deal with img to get its info, but need to change img into binary buffer first.`const buffer = await res.arrayBuffer();`

- DesignConfigurator
  - `npx shadcn-ui@latest add aspect-ratio`, Displays content within a desired ratio.
  - for <NextImage src={imageUrl}, need to add the Url source to next.configure
  - `npm i react-rnd` - make components dragable. Pass paras: add 4 dots, add border, fix ratio, make it smaller.
  - `npx shadcn-ui@latest add scroll-area` - and make content inside
    - `npm install @headlessui/react`
    - set /src/validators, come back to DesignConfigurator to set "options" state
    - shadcn-labels
    - `npx shadcn-ui@latest add dropdown-menu` a little detail to reserve space for unchecked item, in classname, use cn( a===b?"opacity-100":"opacity-0") 
    - use formatPrice util
  - handle user's img config
    - design 2 new state to record img config(size and position), in Rnd, use its provided paras to deconstruture it and save it to our state
    - init 2 refs(phone area and gray dragable area), use `getBoundingClientRect()` to get the position and size.
    - align the coordination system, and calc the relative pos
    - create canvas - context 2d
    - create userImage --> change format to blob --> file --> uploadthing
  - `npm install @tanstack/react-query` -->  
    ```javascript
    import React from 'react';
    import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

    // create instance
    const queryClient = new QueryClient();

    const fetchUserData = async () => {
      const response = await fetch('https://api.example.com/user');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    };

    const UserData = () => {
      // get 3 things from useQuery
      const { data, error, isLoading } = useQuery(['userData'], fetchUserData);

      if (isLoading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;

      return (
        <div>
          <h1>User Data</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
    };

    const App = () => (
      // wrapped
      <QueryClientProvider client={queryClient}>
        <UserData />
      </QueryClientProvider>
    );

    export default App;
    ```
    - add Providers.tsx
    - Button, destruct isPending from useMutation, and 
      ```javascript
      disabled={isPending}
      isLoading={isPending}
      loadingText="Saving"
      ```

### 10-preview
- in page, pass the configuration to DesignPreview.tsx
- resolve the id, and implement all the layout in DesignPreview.tsx
- Recursive font by changing `src/Layout.tsx`
  - `const recursive = Recursive({ subsets: ["latin"] })`
  - `<body className={recursive.className}>`
- modify components/ui/button, add more state?, like isLoading.



### 11-secure payment
- /preview/actions.ts
  - get user by const {getUser} = getKindeServerSession();
  const user = await getUser()
  - get bill order
  - recalculate the price (always do this on server side)
  - install stripe, copy secret key to local env. and add a helper function in lib/stripe.ts
    - create product, stripeSession, pass relative parameters.
  - check user's loggin state before calling stripe func
    - if user's not logged in, open LoginModal
    - LoginModal: install shadcn-dialog

### 12-auth-callback
- Basic Idea: each login user will be filtered through 'src/app/auth-callback' by "KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/auth-callback". 
- in 'auth-callback/page.tsx', if find local storage, which means that the user finished a configuration and just logged in, we push to the preview page. If there's no local storage, we push user to home page '/'.

### 13-strip webhook
在 Stripe 中，Webhook 用于在特定事件发生时通知你的服务器。例如，当支付成功、支付失败、订阅更新等事件发生时，Stripe 会向你指定的 Webhook URL 发送一个 HTTP POST 请求。这使你能够自动处理这些事件，例如更新订单状态、发送确认邮件等。
- stripe, create a new webhook, fillin fake URL, and add event(checkout.session.complete), copy and past the STRIPE_WEBHOOK_SECRET to .env
- route.ts
  - create event and session, get info from session and update our database with new payment state, all the user address
- Vercel
  - npm run build
    - got 'escaped' error -> mod the `.eslintrc.json` to update rules
  - new project in vercel -> open github repo -> paste all env -> deploy
    - deploy warning, so add an empty array to setshowconfetti useEffect.
    - deploy error, need to generating Prisma Client on every deployment: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/vercel-caching-issue
  - once we commit a change to github repo, vercel will automatically redeploy.
  - change the vercel environment start with 'localhost' for the real domain.
  - update the stripe webhook.
  - update the Kinde, my next applications - detail
    - "Allowed callback URLs": "https://casecobra-one-nu.vercel.app/api/auth/kinde_callback"
    - "Allowed logout redirect URLs" : "https://casecobra-one-nu.vercel.app/"

### 13-Thank you page
- page: suspense
- actions.ts: create and export a function called 'getPaymentStatus' use orderId as params, again on server side, to fetch the order's info from DB. If not yet paid (return false), else payment done (return the Order).
- in ThankYou.tsx: 
  - get orderId from URL by useSearchParams()
  - use useQuery again to call the 'getPaymentStatus' function, and get the `data`. And RETRY every 0.5s.

### 14-dashboard
- Firstly, avoid unauthenticated user from directly type the dashboard url address to visit secret data, we have to firstly check the user.
- db.order.aggregate to get current order's amount. Set time to weekly or monthly --> checking code for details.
- 'shadcn/card' + Progress to display the current progress
- shadcn/table:
  - behind it is Tanstack table
  - map status to create Row
  - onclick = mutate(id, newStatus) + useMutation:
  ```javascript
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatus,
    onSuccess: () => router.refresh(),
  });
  ```
  - when click, pass the paras and call changeOrderStatus. implement changeOrderStatus in actions.ts, within it update the db.
  - when finished, if success, we can use the router.refresh().

### 15-react email
- need custom domain!
- npm i @react-email/components
- create OrderReceivedEmail.tsx. demo can be found at https://demo.react.email/preview/receipts/nike-receiptview=source
- `<Html> <Head /> <Preview>: this will display as the title at inbox`
- add `VERCEL_URL = casecobra-one-nu.vercel.app/` in env, and define baseUrl
- copy css config at the bottom.
- RESEND:
  - npm i resend
  - create acct, creat api/key, save it in env
  - go back to /webhooks/route.ts： 
  ```javascript
  import {Resend} from 'resend'
  const resend = new Resend(process.env.RESEND_API_KEY)
  ```
  - at the end of try, add `await resend.emails.send({.....`
  - don't forget to add RESEND_API_KEY to vercel env.

### 16-metadata:
- in utils.ts: `export function constructMetadata({`
- in layout: `export const metadata = constructMetadata()`