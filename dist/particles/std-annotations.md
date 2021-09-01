---
layout: 'default'
title: 'Std annotations'
nav_order: 12
parent: Particles
---

# `std` annotations

### Analysis helpers

Converter marker:
```
impl String {
    @apiMarker(kind: 'converter')
    func toInt = parseInt(self)
}

func main {
    let s: String = '123'
    let a: int = s
}
```

And this code will produce an error like:
```
Invalid type String for int
Note: try call s.toInt()
```
