# Log Processor

Small streaming-based log processor.

Usage:

```
node projects/log-processor/index.js projects/log-processor/sample.log projects/log-processor/filtered.log INFO
```

This reads `sample.log`, filters entries with level >= `INFO`, writes `filtered.log`, and prints counts.
