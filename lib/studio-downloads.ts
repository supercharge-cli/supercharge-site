export const studioRelease = 'v0.1.6';

export const studioLatestDownload =
  'https://github.com/supercharge-cli/supercharge-studio/releases/latest/download';

export const studioReleasePage =
  'https://github.com/supercharge-cli/supercharge-studio/releases/latest';

export const desktopDownloads = [
  { name: 'Linux AppImage', file: 'Supercharge-Studio_0.1.5_amd64.AppImage', note: 'Portable, x86_64' },
  { name: 'Debian / Ubuntu', file: 'Supercharge-Studio_0.1.5_amd64.deb', note: '64-bit package' },
  { name: 'Fedora / RPM', file: 'Supercharge-Studio-0.1.5-1.x86_64.rpm', note: '64-bit package' },
  { name: 'macOS', file: 'Supercharge-Studio_0.1.5_universal.dmg', note: 'Universal build' },
  { name: 'Windows installer', file: 'Supercharge-Studio_0.1.5_x64-setup.exe', note: '64-bit setup' },
  { name: 'Windows MSI', file: 'Supercharge-Studio_0.1.5_x64_en-US.msi', note: '64-bit installer' },
];

export const androidUniversal = {
  name: 'Universal Android APK',
  file: 'supercharge-studio-android-universal-unsigned.apk',
  note: 'Unsigned. Sign it before installing on a phone.',
};

export const serverDownloads = [
  { name: 'Linux server', file: 'supercharge-studio-server-x86_64-unknown-linux-gnu', note: 'x86_64 binary' },
  { name: 'Linux server, ARM64', file: 'supercharge-studio-server-aarch64-unknown-linux-gnu', note: 'aarch64 binary' },
  { name: 'macOS server', file: 'supercharge-studio-server-aarch64-apple-darwin', note: 'Apple Silicon binary' },
  { name: 'Windows server', file: 'supercharge-studio-server-x86_64-pc-windows-msvc.exe', note: 'x64 binary' },
  { name: 'Linux systemd unit', file: 'supercharge-studio-server.service', note: 'Service file for the Linux server' },
];
