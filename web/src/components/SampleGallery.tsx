import CoxeterSymmetryGeneratorExtendedSample from './Coxeter Symmetry Generator Extended';
import CoxeterSymmetryGeneratorSample from './Coxeter Symmetry Generator';
import FeatureMapRuntimeSample from './Feature Map Runtime';
import IChing256CentroidSample from './I Ching 256 Centroid';
import MultiOrbitCoxeterGeneratorSample from './Multi-Orbit Coxeter Generator';
import NonSymmetricCoxeterEngineSample from './Non-Symmetric Coxeter Engine';
import ParametricLedGeneratorSample from './Parametric LED Generator';
import PsyncProtocolSimulatorSample from './PSYNC Protocol Simulator';
import UnifiedParametricEngineSample from './Unified Parametric Engine';

export default function SampleGallery() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 12,
        padding: 12,
        background: '#070a10',
        minHeight: '100vh',
      }}
    >
      <CoxeterSymmetryGeneratorExtendedSample />
      <CoxeterSymmetryGeneratorSample />
      <FeatureMapRuntimeSample />
      <IChing256CentroidSample />
      <MultiOrbitCoxeterGeneratorSample />
      <NonSymmetricCoxeterEngineSample />
      <ParametricLedGeneratorSample />
      <PsyncProtocolSimulatorSample />
      <UnifiedParametricEngineSample />
    </div>
  );
}
