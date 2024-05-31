

### 03-npx next, shadui-cn, got lib/utils.ts, MaxWidthWrapper



### 04-npm i framer-motion



### 08-npm i react-dropzone - "https://react-dropzone.js.org/#src"
- Need to set the layout in order to make it full view screen height.

### 08-use shadcn progress by "npx shadcn-ui@latest add progress"

### 08-use uploadthings and add 'secret' + 'app_id' to .env "npm install uploadthing @uploadthing/react"
- follow the doc page (add 2 files in app/api/uploadthing)
- add 1 another configuration file in `lib/` folder.
- install `zod` to verify the uploaded file meet our standard(format, size)
- changed core.ts and upload/page a lot, main idea is to pass the configId from the server side to the client side.
- install shadcn-toast, follow the doc: need to add <Toast/> at the app/layout.tsx.



