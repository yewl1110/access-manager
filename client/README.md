# dayjs utc & timezone
- dayjs만 갖다 쓰게 된다면 항상 local timezone이 적용된다.
- 서버에는 utc의 형태로 저장해야 하기 때문에 변환이 필요하다.
- dayjs에서는 utc를 지원하지만 플러그인을 따로 적용해야 한다.
## 플러그인 적용
```js
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
```
## 사용법
### local time -> utc 변환
```js
dayjs.utc(Date.now()).format()
```
`2024-06-12T10:40:11Z`
### client 타임존 확인
```js
dayjs.tz.guess()
```
`Asia/Seoul`
### utc -> local time 변환
```js
const utcTime = dayjs.utc(Date.now())
const timezone = dayjs.tz.guess()
dayjs.tz(utcTime, timezone).format()
```
`2024-06-12T19:40:11+09:00`
## [ISO 8601](https://ko.wikipedia.org/wiki/ISO_8601) 
- `format()`을 파라미터 없이 사용하면 ISO 8601 표기법으로 변환된다.
- ISO 8601은 날짜와 시간과 관련된 데이터 교환을 다루는 국제 표준이다.
### 표기법.. 
- `<date>T<time>` 형태로 표기한다.
- \<time> (시간 표기) 
  - UTC
    - 시간 뒤에 Z를 표기한다.
    - ex)`10:40:11Z`
  - 시간 오프셋 (local time)
    - ±[hh]:[mm], ±[hh][mm], 혹은 ±[hh] 형식을 시간 뒤에 덧붙인다.
    - ex)`19:40:11+09:00`
    - 표기 시간에서 시간 오프셋만큼 빼면 UTC 시간이 나온다.
    - `10:40:11Z`와 `19:40:11+09:00`은 같은 시간이다.