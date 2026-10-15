// Release assets use fixed, versionless names (since v1.0.9), so these links always
// resolve to the newest release. studioRelease is only a display label.
export const studioRelease = 'v1.0.9';

export const studioLatestDownload =
  'https://github.com/supercharge-cli/supercharge-studio/releases/latest/download';

export const studioReleasePage =
  'https://github.com/supercharge-cli/supercharge-studio/releases/latest';

export const desktopDownloads = [
  { name: 'Linux AppImage', file: 'Supercharge-Studio-linux-x86_64.AppImage', note: 'Portable, x86_64' },
  { name: 'Debian / Ubuntu', file: 'supercharge-studio-linux-amd64.deb', note: '64-bit package' },
  { name: 'Fedora / RPM', file: 'supercharge-studio-linux-x86_64.rpm', note: '64-bit package' },
  { name: 'macOS', file: 'Supercharge-Studio-macos-universal.dmg', note: 'Universal build' },
  { name: 'Windows installer', file: 'Supercharge-Studio-windows-x64-setup.exe', note: '64-bit setup' },
  { name: 'Windows MSI', file: 'Supercharge-Studio-windows-x64.msi', note: '64-bit installer' },
];

export const androidUniversal = {
  name: 'Universal Android APK',
  file: 'supercharge-studio-android-universal.apk',
  note: 'Signed. Works on every Android phone.',
};

export const serverDownloads = [
  { name: 'Linux server', file: 'supercharge-studio-server-linux-x86_64', note: 'x86_64 binary' },
  { name: 'Linux server, ARM64', file: 'supercharge-studio-server-linux-arm64', note: 'aarch64 binary' },
  { name: 'macOS server', file: 'supercharge-studio-server-macos-arm64', note: 'Apple Silicon binary' },
  { name: 'Windows server', file: 'supercharge-studio-server-windows-x64.exe', note: 'x64 binary' },
  { name: 'Linux systemd unit', file: 'supercharge-studio-server.service', note: 'Service file for the Linux server' },
];
