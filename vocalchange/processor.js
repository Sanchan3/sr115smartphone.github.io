// processor.js
class RobotVoiceProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.phase = 0; // 音を揺らすための波のタイミング
  }

  process(inputs, outputs, parameters) {
    // inputs[0] がマイクからの声、outputs[0] がスピーカーへの音
    const input = inputs[0];
    const output = outputs[0];

    if (!input || !input.length) return true;

    // ロボット声の「震え」の速さ（数字を変えると声の高さ・キャラが変わります）
    // 30〜80くらいが宇宙人・ロボットっぽくなります。
    const frequency = 50; 
    // ブラウザが処理している音の細かさ
    const sampleRate = 48000; 

    // 左耳・右耳（チャンネル）ごとに処理
    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];
      
      for (let i = 0; i < inputChannel.length; i++) {
        // サイン波（規則正しい波）を作って、元の声に掛け合わせる
        const modulator = Math.sin(this.phase);
        
        // 元の声 × サイン波 ＝ ロボットボイス！
        outputChannel[i] = inputChannel[i] * modulator;
        
        // 次の音符のために波のタイミングを進める
        this.phase += (2 * Math.PI * frequency) / sampleRate;
      }
    }
    
    // 波が大きくなりすぎないようにリセット
    if (this.phase > 2 * Math.PI) {
      this.phase -= 2 * Math.PI;
    }
    
    return true; // 処理を続ける
  }
}

// index.html側で呼び出している名前と同じ 'pass-through-processor' として登録します
registerProcessor('pass-through-processor', RobotVoiceProcessor);