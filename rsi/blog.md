# What I Learned Interviewing AI Researchers on Recursive AI-Improvement

## Summary

I interviewed 25 researchers across OpenAI, Anthropic, Google DeepMind, UC Berkeley and Stanford on recursive AI improvement – where they agree, where they disagree, and what we should do about it. Those closest to the frontier of AI capabilities are converging on questions that next to no one in Washington is yet tracking. The full analysis is [here](https://arxiv.org/abs/2603.03338).

Not long ago, recursive AI-improvement, the idea of using AI to improve AI itself, was the stuff of science fiction. Today it has become an explicit organizational goal of the leading AI companies (OpenAI, Google DeepMind, and Anthropic). Recent systems are solving problems researchers once thought required genuine novel reasoning, like [olympiad-level math problems](https://x.com/OpenAI/status/1946594928945148246?s=20), suggesting that this goal is no longer far-fetched. 

The length of tasks AI can autonomously complete has been doubling approximately [every seven months](https://metr.org/time-horizons/). Many expect this trend to continue until the impact surpasses previous technological revolutions, such as the internet. This belief is often based on the idea that AI will be able to automate the process of AI research itself, leading to a positive feedback loop. Many AI researchers now sincerely believe recursive AI improvement is within sight, and they described to me what they expect it to look like. 

**Twenty of 25 researchers identified automating AI R\&D as one of the most severe and urgent risks from AI systems, because AI capabilities could improve much faster than our ability to oversee, steer or govern them.**

Researchers pointed to one threshold above all: the point at which AI can do the work of today's AI researchers. Past that, a system could begin improving its own successor. The participants kept citing the “METR Task Horizon Benchmark,” as one of the best ways to measure how much independent work AI can sustain. The benchmark is an unbounded measurement of AI performance in terms of the length of tasks AI agents can complete (e.g. an AI can complete a software task requiring 1, 2, or 10 human-hours). 

# \[METR Figure HERE\]

One surprising finding was that the majority of interviewees expected the most capable AI systems to remain behind closed doors in companies and governments, often expecting them to be used internally to accelerate AI R\&D. 

# Internal Deployments

Of the 20 participants who clearly addressed what they expect AI companies to do with AI-research-capable models, only 20% expected this type of model to be deployed publicly. One participant said, “internal-only deployments might happen, and that is a big risk factor, because there’s just less information.” This prediction seems reasonable: AI companies have already kept AI models internal for various reasons. For instance, [OpenAI reported spending six months on safety research](https://arxiv.org/abs/2303.08774), risk assessment, and iteration before the public knew of GPT-4. Similarly, the US government recently suspended access to Anthropic’s Claude Mythos model. 

A common reason researchers expect internal-deployments is that keeping models internal offers its developers serious advantages by accelerating their own R\&D efforts ahead of competitors. There could be an **incentive flip,** they explained, such that when AI systems can meaningfully speed up AI research, keeping AI R\&D capabilities internal becomes more valuable than selling AI products. Some envisioned a race to secure a **durable lead** over competitors. This would contradict one of the leading motivations given in the founding of OpenAI: [to prevent one actor from getting an uncatchable AI advantage](https://medium.com/backchannel/how-elon-musk-and-y-combinator-plan-to-stop-computers-from-taking-over-17e0e27dd02a). 

On the other hand, participants identified arguments and pressures that would promote diffusion of AI capabilities, including economic pressure to commercialize AI capabilities, insiders leaking milestones, and a culture of boasting about capabilities. Meta’s open-weight releases already demonstrate this strategy. 

Researchers split into three camps on deployment. The largest (50%) expected frontier AI companies to keep their most capable models internal. A minority (20%) expected full public release. The remainder envisioned some hybrid, such as AI companies selling access to a distilled model publicly while keeping their most powerful models, possibly with less guardrails, for themselves. One explained, “They’ll train a base model, then they won’t release that model, not only because it’s not economical but also because it risks distillation, but they will distill it themselves to cheaper \[public\] models." Another nuanced vision suggested that different actors have different incentives, for instance Meta’s open-weight culture might incentivize them to release their models and breakthroughs more publicly than OpenAI or Anthropic. 

# Skeptics and Believers 

The field of artificial intelligence has overpromised in the past, and AI companies *do* have an incentive to exaggerate the power of their products. The most common reason for skepticism was the belief that general intelligence required a discontinuous breakthrough; something that wouldn’t emerge from gradual improvement alone. However, skeptics disagree on what this missing piece is. For example, some said a breakthrough is needed on “creativity,” “taste,” or the ability to generate genuinely novel ideas. Others argued that the ability lacking had to do with how well AIs could verify true hypotheses from false ones. 

On the other hand, many of the most influential AI researchers on earth **believe recursively-improving AI is within sight in the coming years.** Half of those interviewed claimed there already exists a relatively clear, continuous trajectory towards automating AI research. At companies like OpenAI and Anthropic, recursive self-improvement was reported as regular company-wide discussion up to lead researchers and CEOs (Sam Altman, Dario Amodei, Demis Hassabis, Elon Musk). Outside of the leading companies (e.g. in academic settings), participants reported that discussions are less frequent and face more skepticism. Even though discussions may be less common in academia, they are still happening. For example, ICML 2026, one of the largest and most prestigious machine learning conferences, is [hosting a workshop](https://recursive-workshop.github.io/) called “AI with Recursive Self Improvement."

Some likely explanations for the schism between leading companies and academia include:

* Selection effects, wherein ‘deep believers’ leave academia for private labs (e.g. OpenAI) offering enormous salaries, huge research budgets, and moonshot thinking. “I think the largest difference is just having first-person experience of how fast things have gone inside the labs,” said one participant who described the visceral feeling of exponential improvement felt at a leading company.   
* The skeptical-leaning participants pointed out that frontier labs, who are beholden to investors rather than academic reviewers, are incentivized to over-promise and exaggerate their capabilities. 

# What Recursive AI Improvement Looks Like

I asked participants about noteworthy visible milestones towards recursive AI improvement and asked them to illustrate what they expect in the coming years.

Researchers suggested a variety of concrete demonstrations or capability milestones to monitor. For example, top performance on math olympiad questions, or an AI system training and deploying a machine learning model by itself. A widely-loved metric was the aforementioned task horizon benchmark. The variety of milestones is discussed at length in the [full report](https://arxiv.org/abs/2603.03338).

While researchers disagreed on the precise timelines, risk profiles, and preferable governance approaches, a consistent story emerged on what's coming:

1. **Research Speedup Tool Phase:** researchers expect AI systems that are very good at coding to improve, such as [Claude-code](https://www.anthropic.com/product/claude-code) or [Codex](https://chatgpt.com/codex/?utm_source=google&utm_medium=paid_search&utm_campaign=GOOG_X_SEM_GBR_Codex_CDX_BAU_ACQ_PER_MIX_ALL_NAMER_US_EN_111325&c_id=23226110534&c_agid=194939268903&c_crid=807810285012&c_kwid=kwd-111182835&c_ims=&c_pms=9007525&c_nw=g&c_dvc=c&gad_source=1&gad_campaignid=23226110534&gbraid=0AAAAA-I0E5emKKesJA2v9_Po8HhnlKj0h&gclid=Cj0KCQjwr4jSBhCSARIsAOX1E-ItMhtGr9kwRQKimp5w-1cdE8qtrVO0WG7eqNg_gThbXNODoDRwVxoaAjJKEALw_wcB) (coding assistants) but still require human oversight. [Anthropic](https://www.anthropic.com/institute/recursive-self-improvement) reports that their engineers write 8x as many lines of code than they would without existing research speedup tools, but notes this likely doesn’t yet translate to 8x productivity.  
2. **Collaborator Phase:** where AI models are good enough at machine learning to meaningfully contribute to scientific discovery. Interviewees expected humans to guide high level research goals, but allow AI assistants to make design decisions and pose new problems.  
3. **Full automation phase**: AI systems independently execute complete research cycles that drive AI research and algorithmic progress. The key characteristic of this phase is that human oversight becomes a bottleneck – such that removing human guidance, suggestions or oversight *improves* the results. 

After this point, predictions diverged and the various camps (skeptics, believers, optimists, or pessimists) became more evident. Pessimists argue that once removing human oversight improves results, the incentive is to remove humans from the loop entirely. Optimists argue humans could still set goals and benefit from the gains (such as faster science or improved medicine). But many in both camps nonetheless expect systems improving themselves faster than anyone can evaluate– which is, by construction, out of human control. 

# \[3 step paradigm figure here\]

AI progress in AI R\&D capabilities might outpace progress in other domains. This is because:

1. **Programming problems are verifiable.** You can automatically check whether code works; it runs or it doesn't. This means AIs can be trained and tested on this data much more easily. On the other hand, success in music, literature, or art is largely subjective. To compound this effect, the engineers building AI systems are better fit to evaluate AI research than they are to evaluate subjective data, such as poetry.   
2. **It is the number one priority of leading labs.** For instance, OpenAI's Chief Scientist Jakub Pachocki has stated that one of OpenAI's main priorities is to “automate scientific discovery,” with a plan to build automated researchers improving AI. ([source](https://www.youtube.com/watch?v=yBzStBK6Z8c))  
3. **The flywheel argument:** improvements in AI capability directly improve the tool used to make further improvements, potentially leading to positive feedback, which isn't true of other technologies.

# Recursive AI improvement may endanger us

The most common concern researchers raised wasn’t necessarily a specific harm RSI directly implies, but rather what RSI does to every other risk and our ability to mitigate them. 18 of 25 researchers described it this way: "It just speeds up other threat models." It compresses the time humans have to respond while simultaneously accelerating the pace of dangerous capabilities. Rapid progress means wider, more powerful access to the chemical, biological, and cyber harms AI already enables, and less time to react. I flagged 17 of 25 transcripts with concern over “adaptation lag,” a widening gap between how fast AI capabilities advance and how fast human institutions can understand and respond to them. Companies currently face market pressure to create AI systems capable of AI research for a competitive advantage, regardless of whether they are able to do so safely or maintain meaningful oversight. 

Six researchers told me they expected a winner-take-all dynamic. The first company, government or AI itself to achieve recursive improvement could use it to pull permanently ahead of everyone else. As one put it, that entity gains "permanent control over the future of AI development." 

With this said, the interviews were conducted by a single interviewer, me, and my sample may suffer selection bias. Perhaps those willing to engage in a study like this are more concerned on average. How close we are, whether recursive AI improvement involves positive feedback, and the policies that work without backfiring are all open questions. For example, 16 of the interviewees expressed skepticism at some point in their transcripts about positive feedback and intelligence explosions specifically. 

# What should we do?

Interviewees were split on red lines and governance. One problem: the more precisely you define a threshold, the easier it is to measure and enforce, but the more it diverges from an abstract risk with large degrees of uncertainty. However, practically everyone agreed on various measures to increase visibility (e.g. how aware the US government and general public are of AI developments, especially given they might be kept internal), and capacity (the government's ability to forecast AI capabilities and develop competent safeguards during rapid AI progress). 

Below are some recommendations that may help to these ends:

1. **Convene public hearings specifically on recursive AI improvement and associated risks.** Require testimony from CEOs and senior researchers at OpenAI, Anthropic, Google Deepmind, xAi, and possibly other leading companies who work on these systems daily. Researchers report regular internal discussions about automated AI research and see internal capabilities months before the public. The gap between what frontier labs understand and what Washington understands is itself a governance failure.   
2. **Track the threshold:** Direct the Center for AI Security and Innovation (CAISI) to maintain a government-run task-horizon benchmark and publish recurring capability forecasts. Congress should not learn about transformative capability shifts from press releases or unmandated nonprofits. CAISI could also run an anonymized standing interview program with frontier researchers, giving the government foresight into what scientists are observing and expecting, separate from what their companies say in public.   
3. **Fund verification research capacity to prevent loss of control from RSI:** The US cannot credibly propose, enter, or enforce any agreement (e.g. a nonproliferation agreement with China) without mechanisms to verify adherence to those agreements. Whether a lab has crossed a capability threshold or honored a commitment to halt a training run, verification requires technical infrastructure that does not yet exist at scale. This field is underfunded and undeveloped; but without it, any limits are practically unenforceable.

# Conclusion

The researchers closest to this technology typically do not debate whether recursive AI improvement is possible; they debate timelines, speed, mechanisms, and what to do. This consensus has not yet reached Washington. The most powerful AI systems may be withheld by the government or retained within the leading company, pointed at the one task they care about most, while the public is left in the dark. 

Perhaps the believers are wrong. I am an AI researcher and I deliberately sought out skeptical researchers *and* believers at the top of my field. There are points of skepticism and I have tried to do justice to them here and in my paper. However, there are points of consensus beginning to emerge and they are urgent; policymakers should be aware of this.
