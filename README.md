# 🛡️ TuBlock — Super AdBlocker & Circumvention Defuser

## 📋 Giới thiệu (Overview)

**TuBlock** là phiên bản AdBlocker tùy biến mạnh mẽ, được tối ưu đặc trị các trang web xem phim lậu, truyện tranh và bóng đá tại Việt Nam:

- **🚫 Diệt First-Party Ads & Banner cờ bạc:** Tự động phát hiện và triệt tiêu các banner cá cược cứng (789BET, 11BET, 78WIN, QQ88, HI88...) nhúng trực tiếp vào mã nguồn website.
- **🛑 Bẻ gãy Popunder & Click-Hijacking:** Chặn đứng các hành vi giả lập click mở tab mới sang trang web độc hại.
- **🛡️ Phá vỡ Click-Shield Overlays:** Tự động gỡ các lớp kính tàng hình đè lên Video Player mà không gây crash Next.js / React Virtual DOM.
- **🍪 Tự động vượt Cookie Walls & Distraction Control:** Mở khóa toàn bộ tính năng Premium.
- **🇻🇳 Kích hoạt sẵn ABPVN List:** Tích hợp bộ luật lọc quảng cáo toàn diện nhất cho người dùng Việt Nam.

## 🚀 Cài đặt (Installation)

1. Tải hoặc clone repository này về máy:
   ```bash
   git clone git@github.com:nguyenhoangtuantu/AdBlockBypass.git
   ```
2. Mở trình duyệt (Chrome / Cốc Cốc / Brave / Edge) và truy cập: `chrome://extensions` (hoặc `coccoc://extensions`, `brave://extensions`)
3. Bật **Developer mode** (Chế độ dành cho nhà phát triển ở góc trên bên phải)
4. Bấm **Load unpacked** (Tải tiện ích đã giải nén) và chọn thư mục `AdBlockBypass`
5. Tận hưởng trải nghiệm lướt web sạch bóng quảng cáo với **TuBlock**!

## 🙏 Acknowledgments

A huge **thank you** to the [AdBlock](https://getadblock.com/) team for creating such an amazing ad-blocking extension. AdBlock has been a fantastic tool that millions of users rely on every day to have a cleaner, faster, and more enjoyable browsing experience. This project was built upon their incredible work, and we are deeply grateful for their contribution to the open-source community.

## 📝 Modifications & GPLv3 Compliance Notice

TuBlock is a derivative work forked from [AdBlock](https://getadblock.com/) (Copyright © Adblock, Inc. and eyeo GmbH). In compliance with Section 5(a) of the **GNU General Public License v3.0 (GPLv3)**, prominent notices of modifications are stated below:

- **Modification Period:** September – October 2026
- **Modified by:** Nguyễn Hoàng Tuấn Tú (<its.nhtt@gmail.com>)
- **Detailed Summary of Changes:**
  - `manifest.json`: Rebranded to TuBlock with clear derivative attribution; registered custom shield content script (`adblock-shield-main.js`); configured declarativeNetRequest to enable ABPVN and regional filter rulesets by default.
  - `adblock-shield-main.js`: Added custom anti-circumvention script (licensed under GPLv3) executed at `document_start` to neutralize first-party streaming ads, popunders, tab-under redirections, and click-shield overlays.
  - `abp-background.js` & `adblock-options-premiumproxy.js`: Adjusted local UI preference flags (`hasPremium`, `isActiveLicense`) to activate client-side UI features.
  - `button/header.js` & SVG theme icons: Rebranded interface assets to TuBlock to prevent confusion and respect original trademarks.
  - `_locales/*/messages.json`: Updated extension name and short_name strings to TuBlock.

## ⚠️ Disclaimer

This project is intended **strictly for educational and research purposes only**.

All original code, assets, and intellectual property belong to **Adblock, Inc.** and their respective owners. We do not claim ownership of the original AdBlock codebase.

## 📄 License

This program is free software: you can redistribute it and/or modify it under the terms of the **GNU General Public License (GPLv3)** as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

All original code is Copyright © Adblock, Inc. and eyeo GmbH. Modifications and added scripts are Copyright © 2026 Nguyễn Hoàng Tuấn Tú.

Please refer to the [COPYING](./COPYING) file for full license terms and conditions.

---

> **Note:** If you enjoy AdBlock and find it useful, please consider [supporting the developers](https://getadblock.com/premium/) by purchasing a premium subscription. They deserve it! ❤️
