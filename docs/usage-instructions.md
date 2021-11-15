![Find By Color Logo](https://findbycolor-github.s3.amazonaws.com/logo.png "Find By Color Logo")

**[↤ Developer Overview](../README.md)**

Usage Instructions
===

> After installation, you can run the following in terminal:

```console
color-library --options
```

CLI Options
---

```console
  -p, --pantone         Generate Pantone Color Library  [boolean] [default: false]
  -r, --ral             Generate RAL Color Library      [boolean] [default: false]
  -c, --collection      Filter Colors by Collection       [string] [default: null]
  -s, --set             Filter Colors by Set              [string] [default: null]
  -n, --name            Filter Colors by Name             [string] [default: null]
  -x, --code            Filter Colors by Code             [string] [default: null]
  -h, --hex             Filter Colors by HEX              [string] [default: null]
      --dry, --dry-run  Dry Run Only                    [boolean] [default: false]
      --help            Show help                                        [boolean]
      --version         Show version number                              [boolean]
```


Examples using CLI Params
---

Generate All Libraries ( if no params are passed over, all are used )

```console
color-library
```

#### Generate RAL Library

```console
color-library --ral
```

#### Generate Pantone Library

```console
color-library --pantone
```

#### Generate Pantone Fashion Library

```console
color-library -p -collection=fashion
```

#### Generate Pantone Fashion Cotton Library

```console
color-library -p -c=fashion --set=cotton
```

#### Generate Library from Names Containing "blue"

```console
color-library --name=blue
```

#### Generate Library from Codes Containing "tpx"

```console
color-library --code=tpx
```

#### Generate Library from HEX Colors Starting with "abc"

```console
color-library --hex=abc
```

#### Process Libraries but don't write to disk

```console
color-library --dry-run
```
