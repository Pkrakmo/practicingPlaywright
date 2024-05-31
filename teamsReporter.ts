import { request } from '@playwright/test';
import type {
    FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
  } from '@playwright/test/reporter';

  export interface Summary {
    durationInMS: number;
    passed: string[];
    skipped: string[];
    failed: string[];
    warned: string[];
    timedOut: string[];
    status: FullResult["status"] | "unknown" | "warned" | "skipped";
  }
  
  class teamsReporter implements Reporter {

    durationInMS = -1;
    passed: string[] = [];
    skipped: string[] = [];
    failed: string[] = [];
    warned: string[] = [];
    timedOut: string[] = [];
  
    status: Summary["status"] = "unknown";
    startedAt: any

    async webhookHandler(text){

      // webhook goes here
      const url = ''
      const context = await request.newContext({ ignoreHTTPSErrors: true})
      const body = {"text": `${text}`}

      const response = await context.post(url!,{
        headers: { 'Content-type': 'application/json'},
        data: JSON.stringify(body)
      })

      if(response.ok()){
        return
      } else {
        throw new Error(`API request failed with status ${response.status()}`)
      }

    }
  
    onBegin(config: FullConfig, suite: Suite) {
      console.log(`Starting the run with ${suite.allTests().length} tests`);
      const currentDate = new Date();
      console.log(this.startedAt = currentDate);
    }

    onTestEnd(test: TestCase, result: TestResult): void {        
        const title: string[] = [];
        const fileName: string[] = [];
        let clean = true;
        for (const s of test.titlePath()) {
          if (s === "" && clean) continue;
          clean = false;
          title.push(s);
          if (s.includes("spec.ts")) {
            fileName.push(s);
          }
        }
    
        // This will publish the file name + line number test begins on
        const z = `${fileName[0]}:${test.location.line}:${test.location.column}`;        
    
        // Using the t variable in the push will push a full test test name + test description
        const t = title.join(" > ");
    
        const status =
          !["passed", "skipped"].includes(result.status) && t.includes("@warn")
            ? "warned"
            : result.status;
        this[status].push(z);

        console.log("status: ", status);
        
      }
    
    async onEnd(result: FullResult) {
      console.log(`Finished the run: ${result.status}`);
      this.durationInMS = Date.now() - this.startedAt;
      this.status = result.status;
  
      // removing duplicate tests from passed array
      this.passed = this.passed.filter((element, index) => {
        return this.passed.indexOf(element) === index;
      });
  
      // removing duplicate and flakey (passed on a retry) tests from the failed array
      this.failed = this.failed.filter((element, index) => {
        if (!this.passed.includes(element))
          return this.failed.indexOf(element) === index;
      });


/*
      let text = `
      -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. \n 
      Started: ${this.startedAt} \n
      Passed: ${this.passed.length} \n
      Failed: ${this.failed.length + this.timedOut.length} \n
      🟢 ${this.passed.length} | 🔴 ${this.failed.length + this.timedOut.length + this.skipped.length} \n
      -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. \n
      SummaryReporter: ${this.timedOut} \n
      -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
      `

*/

      let text = `
      -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. \n 
      Started: ${this.startedAt} \n
      Runtime: ${this.durationInMS} \n
      🟢 ${this.passed.length} | 🔴 ${this.failed.length + this.timedOut.length + this.skipped.length} \n
      -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-. \n
      Failed: ${JSON.stringify(this.failed, null, "  ")} \n
      Timed out: ${JSON.stringify(this.timedOut, null, "  ")} \n
      Skipped: ${JSON.stringify(this.skipped, null, "  ")} \n
      -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
      `

      await this.webhookHandler(text)
      
    }
  }
  
  export default teamsReporter;