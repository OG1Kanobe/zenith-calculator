'use client';

import { formatCurrency, formatNumber } from '@/lib/calculatorLogic';
import { TotalResults, TaskSelection, Industry, CalculationMethod } from '@/types/calculator.types';

interface PDFResultsViewProps {
  results: TotalResults;
  selectedTasks: TaskSelection[];
  industry: Industry;
  calculationMethod: CalculationMethod; // ADD THIS
}

export default function PDFResultsView({ results, selectedTasks, industry, calculationMethod }: PDFResultsViewProps) {
  const threeYearTotal = results.totalSavingsYear1 + (results.totalSavingsYear2Plus * 2);
  const currentDate = new Date().toLocaleDateString('en-ZA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div 
      id="pdf-results-content"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 0,
        width: '210mm', // A4 width
        backgroundColor: '#ffffff',
        color: '#000000',
        fontFamily: 'Arial, sans-serif',
        padding: '20mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '30px', borderBottom: '3px solid #5ccfa2', paddingBottom: '15px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#5ccfa2',
          margin: '0 0 10px 0',
        }}>
          Zenith AI - ROI Calculator Results
        </h1>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
  Generated on {currentDate} | Industry: {industry} | Method: {calculationMethod === 'salary' ? 'Salary-Based' : 'Hourly Rate'}
</p>
      </div>

      {/* Executive Summary */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#333',
          marginBottom: '15px',
          borderLeft: '4px solid #5ccfa2',
          paddingLeft: '10px',
        }}>
          Executive Summary
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          marginBottom: '20px',
        }}>
          {/* Savings Box */}
          <div style={{ 
            border: '2px solid #5ccfa2',
            borderRadius: '8px',
            padding: '15px',
          }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>
              Total Savings (Year 1)
            </p>
            <p style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: results.totalSavingsYear1 >= 0 ? '#5ccfa2' : '#ff6b6b',
              margin: '0 0 5px 0',
            }}>
              {results.totalSavingsYear1 >= 0 ? '+' : ''}{formatCurrency(results.totalSavingsYear1)}
            </p>
            <p style={{ fontSize: '11px', color: '#666', margin: 0 }}>
              Year 2+: {results.totalSavingsYear2Plus >= 0 ? '+' : ''}{formatCurrency(results.totalSavingsYear2Plus)}/year
            </p>
          </div>

          {/* Time Saved Box */}
          <div style={{ 
            border: '2px solid #5ccfa2',
            borderRadius: '8px',
            padding: '15px',
          }}>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>
              Time Reclaimed Annually
            </p>
            <p style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#5ccfa2',
              margin: '0 0 5px 0',
            }}>
              {formatNumber(results.totalAnnualHours, 0)} hrs
            </p>
            <p style={{ fontSize: '11px', color: '#666', margin: 0 }}>
              That's {formatNumber(results.totalWorkingDays, 0)} working days
            </p>
          </div>
        </div>

        {/* 3-Year Projection */}
        <div style={{ 
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '15px',
        }}>
          <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>
            3-Year Total Savings
          </p>
          <p style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: threeYearTotal >= 0 ? '#5ccfa2' : '#ff6b6b',
            margin: 0,
          }}>
            {threeYearTotal >= 0 ? '+' : ''}{formatCurrency(threeYearTotal)}
          </p>
        </div>
      </div>

      {/* Cost Comparison */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#333',
          marginBottom: '15px',
          borderLeft: '4px solid #5ccfa2',
          paddingLeft: '10px',
        }}>
          Cost Comparison
        </h2>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '14px', color: '#333' }}>Current Manual Process</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {formatCurrency(results.totalAnnualManualCost)}
            </span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '30px', 
            backgroundColor: '#ff6b6b',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '10px',
          }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>100%</span>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: '14px', color: '#333' }}>Zenith AI Solution</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
              {formatCurrency(results.totalZenithYear1Cost)}
            </span>
          </div>
          <div style={{ 
            width: '100%', 
            height: '30px', 
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.min(100, Math.round((results.totalZenithYear1Cost / results.totalAnnualManualCost) * 100))}%`,
              height: '100%',
              backgroundColor: '#5ccfa2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '10px',
            }}>
              <span style={{ color: 'white', fontWeight: 'bold' }}>
                {Math.round((results.totalZenithYear1Cost / results.totalAnnualManualCost) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Cost Reduction: <strong style={{ color: '#5ccfa2', fontSize: '18px' }}>
              {Math.round(results.costReductionPercentage)}%
            </strong>
          </p>
        </div>
      </div>

      {/* Page Break */}
      <div style={{ pageBreakAfter: 'always' }}></div>

      {/* Task Breakdown */}
      <div style={{ marginBottom: '30px', marginTop: '30px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#333',
          marginBottom: '15px',
          borderLeft: '4px solid #5ccfa2',
          paddingLeft: '10px',
        }}>
          Task Breakdown
        </h2>

        {results.taskResults.map((task, index) => (
          <div 
            key={index}
            style={{ 
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
            }}
          >
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              color: '#333',
              margin: '0 0 10px 0',
            }}>
              {task.taskName}
            </h3>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '10px',
              fontSize: '12px',
            }}>
              <div>
                <p style={{ color: '#666', margin: '0 0 3px 0' }}>Volume</p>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{task.volume}/month</p>
              </div>
              <div>
                <p style={{ color: '#666', margin: '0 0 3px 0' }}>Year 1 Savings</p>
                <p style={{ 
                  fontWeight: 'bold', 
                  margin: 0,
                  color: task.savingsYear1 >= 0 ? '#5ccfa2' : '#ff6b6b',
                }}>
                  {task.savingsYear1 >= 0 ? '+' : ''}{formatCurrency(task.savingsYear1)}
                </p>
              </div>
              <div>
                <p style={{ color: '#666', margin: '0 0 3px 0' }}>Time Saved</p>
                <p style={{ fontWeight: 'bold', margin: 0 }}>
                  {formatNumber(task.annualHoursSaved, 0)} hrs/year
                </p>
              </div>
            </div>

            <div style={{ 
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: '1px solid #eee',
            }}>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                fontSize: '11px',
              }}>
                <div>
                  <p style={{ color: '#666', margin: 0 }}>
                    Manual Cost: {formatCurrency(task.annualManualCost)}
                  </p>
                </div>
                <div>
                  <p style={{ color: '#666', margin: 0 }}>
                    Zenith Cost (Year 1): {formatCurrency(task.zenithYear1Cost)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Disclaimer */}
      <div style={{ 
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '2px solid #ddd',
        fontSize: '10px',
        color: '#666',
      }}>
        <p style={{ marginBottom: '8px' }}>
          <strong>*</strong> Zenith pricing includes setup, monthly optimization, and estimated AI usage costs based on 
          current API rates and your specified volume. Actual AI costs may vary slightly based on usage complexity. 
          No hidden fees.
        </p>
        <p style={{ margin: 0 }}>
          <strong>**</strong> All time savings, cost reductions, and ROI projections are estimates based on your inputs and 
          industry-standard benchmarks. Actual results may vary depending on implementation, workflow complexity, 
          and usage patterns.
        </p>
      </div>

      {/* Branding Footer */}
      <div style={{ 
        marginTop: '30px',
        textAlign: 'center',
      }}>
        <p style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          color: '#5ccfa2',
          margin: '0 0 5px 0',
        }}>
          Zenith AI
        </p>
        <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
          Automation that pays for itself | www.zenithai.com
        </p>
      </div>
    </div>
  );
}