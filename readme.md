Corita is an interactive-text-transformer-based professor, trained on the oral histories of the visual artist and professor [Corita Kent](https://en.wikipedia.org/wiki/Corita_Kent). Corita was developped for the semester project « [Libérer les énérgies créatrices](http://esaaix.fr/IMG/pdf/esaaix_livret__2019_2020__fevrier2_web_.pdf) » (p.30) at the [École supérieure d'art d'Aix-en-Provence](http://ecole-art-aix.fr).

The project relies heavily on research into using [GPT-2]() in a design context, as developped in collaboration with [Jürg Lehni](http://juerglehni.com), [Nicolas Baldran](https://www.hesge.ch/head/annuaire/nicolas-baldran), and the students of the [Media Design Master](https://www.hesge.ch/head/formations-recherche/master-en-media-design), [HEAD — Genève](https://www.hesge.ch/head/) for our project [Thinking Machines](https://github.com/abstractmachine/ThinkingMachines). For more information on the Thinking Machines project, see the conference "[Thinking Machines](http://www.anthonymasure.com/en/conferences/2020-01-thinking-machines-bal-paris)" by Anthony Masure and Alexia Mathieu.

The original Node server code and configuration files were written by [Jürg Lehni](http://juerglehni.com) for the [Thinking Machines](https://github.com/abstractmachine/ThinkingMachines) project.

See the `package.json` file for [node](http://nodejs.org/)/npm requirements:

```
> cd Corita
> npm install
```

To start the Node server:

```
> cd Corita
> npm run dev
```

Or,

```
> cd Corita
> npm run start
```

To run [gpt-2](https://openai.com/blog/better-language-models/), you will need to build the `corita` model (cf. `gpt/models/corita`) as the current required file `model-2149.data-00000-of-00001` is [too large for github current restrictions on filesize](https://help.github.com/en/github/managing-large-files/conditions-for-large-files). To train your own gpt-2 model cf. [Beginner’s Guide to Retrain GPT-2 (117M) to Generate Custom Text Content](https://medium.com/@ngwaifoong92/beginners-guide-to-retrain-gpt-2-117m-to-generate-custom-text-content-8bb5363d8b7f) by [Ng Wai Foong](https://medium.com/@ngwaifoong92) and [GPT-2 Neural Network Poetry](https://www.gwern.net/GPT-2) by [Gwern Branwen](https://www.gwern.net/).

To train with [gpt-2](https://openai.com/blog/better-language-models/), you will need to install [Python](https://www.python.org/downloads/) and [TensorFlow](https://www.tensorflow.org). This project currently uses `python 3.7.6` and `Tensorflow 1.13.1`.

To train the current configuration:

```
> cd gpt2
> python src/encode.py text/corita.txt text/corita.npz
> python src/train.py --dataset text/corita.npz
```

Use `^c` to interrupt the training, and continue with:

```
> python src/train.py --dataset text/corita.npz
```

To test the current training state:

```
> src/interactive_conditional_samples.py --model_name corita --top_k 40 --temperature 0.8 --length 64
```

When you are done training, copy the following files:

```
gtp2/checkpoint/run1/checkpoint
gtp2/checkpoint/run1/model-####.data-00000-of-00001
gtp2/checkpoint/run1/model-####.index
gtp2/checkpoint/run1/model-####.meta
```

...into the folder:

```
> gpt2/models/corita/
```
