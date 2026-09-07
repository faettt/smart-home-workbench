# 全屋智能点位工作台

一个单文件网页应用（`index.html`），用于管理全屋智能装修的灯 / 开关 / 传感器 / 其他点位，替代 Excel 表格。

**在线使用**：https://faettt.github.io/smart-home-workbench/

## 功能

- 按室内空间管理 灯 / 开关 / 插座 / 传感器 / 其他 五类点位（名称、数量、单项备注）
- 每个空间支持单独备注；右侧栏支持多条全局备注
- 一键导出 Excel（.xlsx，含点位总表 / 明细清单 / 全局备注三个工作表）
- 数据自动保存在本机浏览器（localStorage），支持 JSON 备份 / 导入迁移
- 可自由添加、重命名、删除空间
- 响应式适配：手机端自动切换为「空间横滑选择 + 单列编辑」布局，PC 端排版不受影响
- **云同步（多设备）**：数据自动存入 GitHub 私密 Gist，多设备间自动同步（按时间戳防互相覆盖，另有强制上传/下载兜底）

## 云同步配置（免费）

1. 登录 GitHub → 右上角头像 → **Settings** → 左下 **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**
2. Note 随意填，**勾选 `gist` 这一个权限**（其他不勾）→ Generate
3. 复制生成的 Token（`gho_` 开头），粘贴到工作台右栏「🔄 云同步」面板 → 点「连接」，会自动创建云端 Gist
4. 其他设备打开同一网址，粘贴**同一个 Token** 点「连接」即可（连接框里会显示已生成的 Gist ID）

说明：数据以私密 Gist 形式存在你的 GitHub 账号下，只有持有 Token 的设备能读写；修改后约 4 秒自动上传，打开页面和切回标签页时自动检查云端；若两台设备先后修改，后上传的一方检测到云端更新会暂停并提示，避免覆盖。

## 数据说明

- 所有数据仅保存在**你自己浏览器**的 localStorage 中，不会上传到任何服务器；换设备或换浏览器时，请用「备份 JSON」导出，再到新设备「导入 JSON」。
- 清理浏览器数据（清除站点数据）会丢失本地数据，请定期备份 JSON。

## 本地使用

直接双击 `index.html` 在浏览器打开即可，离线可用。

## 更新部署

修改 `index.html` 后：

```bash
git add index.html && git commit -m "update" && git push
```

GitHub Pages 会自动重新发布（约 1 分钟）。
