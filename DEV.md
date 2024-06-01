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
  - `npm i react-rnd` - make components dragable.



