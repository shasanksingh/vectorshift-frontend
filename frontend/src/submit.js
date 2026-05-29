// submit.js

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from './store';

export const SubmitButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const clearPipeline = useStore((state) => state.clearPipeline);

    const handleSubmit = async () => {
        if (nodes.length === 0 || edges.length === 0) {
            setResult(null);
            setError('Please use the available nodes to make a pipeline before submitting.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Pipeline parse request failed');
            }

            const result = await response.json();
            setResult(result);
        } catch (error) {
            setError('Unable to parse the pipeline. Make sure the FastAPI backend is running on http://localhost:8000.');
            setResult(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClear = () => {
        setResult(null);
        setError('');
        clearPipeline();
    };

    const resultDialog = (result || error) ? createPortal(
        <div className="result-overlay" role="dialog" aria-modal="true" aria-labelledby="pipeline-result-title">
            <div className="result-modal">
                <button className="modal-close" type="button" onClick={() => { setResult(null); setError(''); }} aria-label="Close result">
                    x
                </button>
                <p className="eyebrow">Pipeline Analysis</p>
                <h2 id="pipeline-result-title">
                    {error
                        ? error.startsWith('Please use') ? 'Pipeline Required' : 'Backend unavailable'
                        : 'Submission Complete'}
                </h2>

                {error ? (
                    <p className="result-error">{error}</p>
                ) : (
                    <>
                        <div className="result-grid">
                            <div className="result-stat">
                                <span>Nodes</span>
                                <strong>{result.num_nodes}</strong>
                            </div>
                            <div className="result-stat">
                                <span>Edges</span>
                                <strong>{result.num_edges}</strong>
                            </div>
                            <div className={`result-stat ${result.is_dag ? 'is-valid' : 'is-cycle'}`}>
                                <span>DAG Status</span>
                                <strong>{result.is_dag ? 'True' : 'False'}</strong>
                            </div>
                        </div>
                        <p className="result-copy">
                            {result.is_dag
                                ? 'No directed cycle was detected in this pipeline.'
                                : 'A directed cycle was detected. This is the expected false DAG state for your cycle demo.'}
                        </p>
                    </>
                )}
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <>
            <div className="submit-dock" aria-label="Pipeline submission">
                <button className="clear-button" type="button" onClick={handleClear} disabled={isSubmitting || (nodes.length === 0 && edges.length === 0)}>
                    Clear
                </button>
                <button className="submit-button" type="button" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>

            {resultDialog}
        </>
    );
}
