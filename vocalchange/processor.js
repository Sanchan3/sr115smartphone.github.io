// processor.js
class RobotVoiceProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.phase = 0; // 音を揺らすための波のタイミング
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    if (!input || !input.length) return true;

    // ロボット声の「震え」の速さ
    const frequency = 50; 
    
    // ※ sampleRate はAudioWorkletの標準変数として既に存在するため定義不要

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];
      
      for (let i = 0; i < inputChannel.length; i++) {
        const modulator = Math.sin(this.phase);
        
        outputChannel[i] = inputChannel[i] * modulator;
        
        // システムの sampleRate を使用してタイミングを計算
        this.phase += (2 * Math.PI * frequency) / sampleRate;
      }
    }
    
    if (this.phase > 2 * Math.PI) {
      this.phase -= 2 * Math.PI;
    }
    
    return true;
  }
}

registerProcessor('pass-through-processor', RobotVoiceProcessor);