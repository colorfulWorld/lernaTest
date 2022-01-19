# @zgltryy/zwt-cli

A rapid development project tool based on Vue.

# 安装

```
npm install @zgltryy/zwt-cli -g
```

# Usage

Open your terminal and type `zwt` or `zwt -h` , you'll see the help infomation below:

```
  Usage: im <rapid development project tool>


  Commands:
    create [options] <app-name>         Generate a new project
    list|l                              List all the templates

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

# Commands

### create | c

you can use this command to generate a project by choose a third-party template.

```
$ zwt create t1

√ Downloading template...
√ The object has installed dependence successfully!
```

### list | l

It shows you the templates list.

```
$ zwt list

┌──────────┬──────────┬───────────────────────────────────────────────────────────┐
│ Template │ Branch   │ Url                                                       │
├──────────┼──────────┼───────────────────────────────────────────────────────────┤
│ template1│ master   │ http://10.124.163.76:8888/superlcientfiles/subapp-h5.git  │
└──────────┴──────────┴───────────────────────────────────────────────────────────┘
```

# Template

The most important part of im is `template`. The official template information is listed in templates.json, and the third-party templates are listed in remote-templates.json.A template means a project sample, which has a simple or complex file structure.

You can create your own templates repository, and push your templates in different branches. All you need to do then is to add the templates into im's `templates.json`.

# Env and dependencies

- node
- webPack
- Vuex
- VueRouter
- vant
- axios

# License

需要连接公司内部VPN才能下载
MIT.

