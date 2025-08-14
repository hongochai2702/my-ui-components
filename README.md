# Cấu Trúc Dự Án Mẫu

Dưới đây là cấu trúc thư mục mẫu cho dự án React + TypeScript + Vite + Storybook. Giả sử dự án tên là `my-ui-components`. Tôi sẽ cung cấp các file chính và nội dung mẫu. Bạn có thể tạo dự án bằng cách chạy `npm create vite@latest my-ui-components -- --template react-ts`, sau đó tích hợp Storybook.

```
my-ui-components/
├── .storybook/                  # Cấu hình Storybook
│   ├── main.ts                  # Cấu hình chính
│   └── preview.ts               # Preview settings
├── src/
│   ├── components/              # Các UI components
│   │   ├── Button/              # Ví dụ component Button (giống Radix UI)
│   │   │   ├── Button.tsx       # Source code component
│   │   │   ├── Button.stories.tsx # Story cho Storybook
│   │   │   └── index.ts         # Export component
│   │   └── index.ts             # Export tất cả components
│   ├── index.ts                 # Entry point cho thư viện
│   └── styles/                  # CSS nếu cần (hoặc dùng Tailwind nếu tích hợp)
├── vite.config.ts               # Cấu hình Vite cho library mode
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies và scripts
├── .npmrc                       # Cấu hình cho Nexus (nếu publish)
├── README.md                    # Hướng dẫn sử dụng
└── Jenkinsfile                  # Pipeline cho CI/CD (nếu dùng declarative pipeline)
```

### Nội Dung Mẫu Các File Chính

- **package.json** (mẫu cơ bản, thêm dependencies sau):

  ```json
  {
    "name": "@your-org/my-ui-components",
    "version": "1.0.0",
    "main": "dist/index.js",
    "module": "dist/index.mjs",
    "types": "dist/index.d.ts",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "storybook": "storybook dev -p 6006",
      "build-storybook": "storybook build",
      "test": "vitest" // Nếu dùng Vitest cho test
    },
    "dependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "devDependencies": {
      "@storybook/addon-essentials": "^8.0.0",
      "@storybook/addon-interactions": "^8.0.0",
      "@storybook/addon-links": "^8.0.0",
      "@storybook/blocks": "^8.0.0",
      "@storybook/react": "^8.0.0",
      "@storybook/react-vite": "^8.0.0",
      "@storybook/test": "^8.0.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "@vitejs/plugin-react": "^4.0.0",
      "storybook": "^8.0.0",
      "typescript": "^5.0.0",
      "vite": "^5.0.0"
    },
    "peerDependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "files": ["dist"]
  }
  ```

- **vite.config.ts** (cho library mode):

  ```ts
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import { resolve } from 'path';

  export default defineConfig({
    plugins: [react()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'MyUIComponents',
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
  });
  ```

- **.storybook/main.ts**:

  ```ts
  import type { StorybookConfig } from '@storybook/react-vite';

  const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-interactions',
    ],
    framework: {
      name: '@storybook/react-vite',
      options: {},
    },
    docs: {
      autodocs: 'tag',
    },
  };
  export default config;
  ```

- **src/components/Button/Button.tsx** (mẫu component giống Radix UI - primitive button):

  ```tsx
  import React from 'react';

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
  }

  const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
    const className = variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white';
    return <button className={`${className} px-4 py-2 rounded`} {...props}>{children}</button>;
  };

  export default Button;
  ```

- **src/components/Button/Button.stories.tsx**:

  ```tsx
  import type { Meta, StoryObj } from '@storybook/react';
  import Button from './Button';

  const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
  };

  export default meta;
  type Story = StoryObj<typeof Button>;

  export const Primary: Story = {
    args: {
      children: 'Primary Button',
      variant: 'primary',
    },
  };
  ```

- **src/index.ts**:

  ```ts
  export { default as Button } from './components/Button/Button';
  ```

# Hướng Dẫn Cài Đặt Và Sử Dụng Storybook

1. **Cài Đặt Storybook**:
   - Chạy lệnh: `npx storybook@latest init --builder vite`.
   - Điều này sẽ tự động cấu hình Storybook cho Vite + React + TS.

2. **Chạy Storybook**:
   - Thêm script vào `package.json`: `"storybook": "storybook dev -p 6006"`.
   - Chạy: `npm run storybook`.
   - Truy cập `http://localhost:6006` để preview components.

3. **Xây Dựng Storybook Thành Bản Static**:
   - Thêm script: `"build-storybook": "storybook build"`.
   - Chạy: `npm run build-storybook`.
   - Kết quả sẽ ở thư mục `storybook-static/`. Bạn có thể phục vụ nó bằng bất kỳ web server nào (ví dụ: `npx serve storybook-static`) hoặc deploy lên GitHub Pages/Netlify để preview.

# Hướng Dẫn Build Thư Viện Và Sử Dụng Trong Dự Án Khác

1. **Build Thư Viện**:
   - Đảm bảo `vite.config.ts` được cấu hình như trên (library mode).
   - Chạy: `npm run build`.
   - Kết quả ở thư mục `dist/` (bao gồm JS, ESM, types).

2. **Publish Thư Viện Lên NPM (hoặc Nexus)**:
   - Cập nhật `package.json` với tên package (ví dụ: `@your-org/my-ui-components`).
   - Để publish lên NPM public: `npm publish`.
   - Để publish lên Nexus: Xem phần CI/CD bên dưới.

3. **Sử Dụng Trong Dự Án Khác**:
   - Trong dự án khác, cài đặt: `npm install @your-org/my-ui-components`.
   - Import và sử dụng: `import { Button } from '@your-org/my-ui-components';`.

# Hướng Dẫn Link Thư Viện Từ Local (Local Linking)

1. **Trong Dự Án Thư Viện**:
   - Chạy: `npm run build` để build dist.
   - Chạy: `npm link` (tạo symlink global cho package).

2. **Trong Dự Án Tiêu Thụ (Dự Án Khác)**:
   - Chạy: `npm link @your-org/my-ui-components` (link đến symlink global).
   - Bây giờ bạn có thể import components từ thư viện local. Mọi thay đổi trong thư viện cần rebuild và restart dự án tiêu thụ.

   Lưu ý: Nếu dùng Yarn, thay bằng `yarn link` và `yarn link @your-org/my-ui-components`. Để unlink: `npm unlink` hoặc `yarn unlink`.

# Hướng Dẫn Cấu Hình CI/CD Với Jenkins Để Publish Lên Nexus

Giả sử bạn có Nexus Repository Manager thiết lập (Sonatype Nexus OSS hoặc Pro), với một repository NPM hosted (ví dụ: `npm-hosted`). Bạn cần credential cho Nexus (username/password hoặc API key).

### Bước 1: Thiết Lập Nexus

- Đăng nhập Nexus dashboard.
- Tạo repository: Repositories > Create > npm (hosted).
- Lấy URL repository (ví dụ: `http://your-nexus-host/repository/npm-hosted/`).
- Tạo user/role với quyền publish.

### Bước 2: Cấu Hình .npmrc Cho Publish

- Trong dự án, tạo `.npmrc`:

  ```
  registry=http://your-nexus-host/repository/npm-hosted/
  _auth=base64-encoded-credentials (hoặc dùng username/password trong CI)
  always-auth=true
  ```

  - Để an toàn, không commit `.npmrc` với credential; inject qua CI.

### Bước 3: Thiết Lập Jenkins

- Cài Jenkins (nếu chưa có), thêm plugin: NodeJS, Pipeline, Credentials.
- Cài NodeJS tool trong Jenkins: Manage Jenkins > Tools > NodeJS Installations (chọn version phù hợp, ví dụ Node 20).

### Bước 4: Tạo Jenkins Pipeline

- Tạo job mới: Pipeline.
- Sử dụng declarative pipeline trong `Jenkinsfile` (thêm vào repo dự án).
- Mẫu `Jenkinsfile` (Groovy syntax):

  ```groovy
  pipeline {
      agent any
      tools { nodejs "Node20" } // Tên NodeJS installation trong Jenkins

      environment {
          NEXUS_URL = 'http://your-nexus-host/repository/npm-hosted/'
          NEXUS_CREDENTIALS_ID = 'nexus-credentials' // ID của credentials trong Jenkins (username/password)
      }

      stages {
          stage('Checkout') {
              steps {
                  checkout scm
              }
          }

          stage('Install Dependencies') {
              steps {
                  sh 'npm install'
              }
          }

          stage('Test') {
              steps {
                  sh 'npm test' // Nếu có script test
              }
          }

          stage('Build') {
              steps {
                  sh 'npm run build'
                  sh 'npm run build-storybook' // Optional: Build Storybook
              }
          }

          stage('Publish to Nexus') {
              when {
                  branch 'main' // Chỉ publish trên branch main
              }
              steps {
                  withCredentials([usernamePassword(credentialsId: "${NEXUS_CREDENTIALS_ID}", usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')]) {
                      sh """
                      echo "registry=${NEXUS_URL}" > .npmrc
                      echo "${NEXUS_URL}:_auth=\$(echo -n '${NEXUS_USER}:${NEXUS_PASS}' | base64)" >> .npmrc
                      echo "always-auth=true" >> .npmrc
                      npm publish
                      """
                  }
              }
          }
      }

      post {
          always {
              cleanWs() // Dọn dẹp workspace
          }
      }
  }
  ```

### Bước 5: Thiết Lập Credentials Trong Jenkins

- Manage Jenkins > Credentials > Add: Username with password (NEXUS_USER và NEXUS_PASS cho Nexus).
- ID: `nexus-credentials`.

### Bước 6: Trigger Pipeline

- Commit code lên repo (GitHub/Bitbucket với webhook đến Jenkins).
- Pipeline sẽ tự động: Checkout > Install > Test > Build > Publish (nếu trên main).
- Theo dõi log Jenkins để debug.

Lưu ý:

- Điều chỉnh URL Nexus và credentials theo setup của bạn.
- Nếu dùng GitHub Actions thay vì Jenkins, có thể dễ hơn, nhưng theo yêu cầu là Jenkins.
- Test pipeline locally với `jenkinsfile-runner` nếu cần.
- Đảm bảo version package tăng tự động (sử dụng `npm version patch` trong stage trước publish).
