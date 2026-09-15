# AdBlock Bypass - Premium Features Unlocker

## 📋 Description

This is a modified version of the [AdBlock](https://getadblock.com/) browser extension that unlocks two premium features for testing and educational purposes:

- **🍪 Skip Cookie Walls** — Automatically hides cookie consent popups on websites
- **🚫 Block Distractions** — Blocks distracting elements like login popups, newsletter modals, chat widgets, and app download prompts

## 🔧 What Was Modified

Only **2 files** were changed to bypass the premium license check:

| File | Change |
|------|--------|
| `button/components/PopupSection.js` | Force premium UI toggle instead of "Learn More" lock button |
| `abp-background.js` | Always return `activeLicense = true` to enable premium features |

## 🚀 Installation

1. Download or clone this repository
2. Open `chrome://extensions` in your browser
3. Enable **Developer mode** (top right corner)
4. Click **Load unpacked** and select the project folder
5. Open the AdBlock popup — you should now see toggle switches for both premium features

## 🙏 Acknowledgments

A huge **thank you** to the [AdBlock](https://getadblock.com/) team for creating such an amazing ad-blocking extension. AdBlock has been a fantastic tool that millions of users rely on every day to have a cleaner, faster, and more enjoyable browsing experience. This project was built upon their incredible work, and we are deeply grateful for their contribution to the open-source community.

## ⚠️ Disclaimer

This project is intended **strictly for educational and research purposes only**.

All original code, assets, and intellectual property belong to **Adblock, Inc.** and their respective owners. We do not claim ownership of any part of the original AdBlock extension.

**If this repository infringes upon any copyrights or violates any terms of service, please contact us and we will take it down immediately.** We fully respect the rights of the original developers and have no intention of causing any harm to their business or reputation.

## 📄 License

The original AdBlock extension is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). Please refer to the original [COPYING](./COPYING) file for full license details.

---

> **Note:** If you enjoy AdBlock and find it useful, please consider [supporting the developers](https://getadblock.com/premium/) by purchasing a premium subscription. They deserve it! ❤️
