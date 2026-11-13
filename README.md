# MuseTab 只读云端曲库

将曲谱直接上传至默认分支 main 的对应目录：

- `mid/`：.mid 或 .midi
- `mscz/`：.mscz
- `pdf/`：.pdf

支持目录内的子文件夹和大小写文件名。上传完成后，GitHub Actions 自动更新
`catalog.json`；在 MuseTab 的云端曲库中刷新即可。通常需要等待自动任务完成，
列表的“更新于”显示的是清单生成时间。

App 直接读取静态清单和原始文件，不调用 GitHub REST 目录 API，也不需要登录或令牌。
所有乐谱先保存到本地才能打开；本地编辑不回传。云端新版本会保存为新的本地副本。
App 暂限单文件 32 MB；请直接上传文件，不使用 Git LFS 指针。

手动重建：仓库 Actions → Update score catalog → Run workflow。
不要手动编辑 catalog.json。此文件仅存文件名、路径、大小、校验值和版本信息。

